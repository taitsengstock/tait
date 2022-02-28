/* eslint-disable no-prototype-builtins */
import sanityClient from '@sanity/client'
import { netlifyBuildHookId } from '../utils/constants'
import crypto from 'crypto'
import axios from 'axios'

const client = sanityClient({
	projectId: process.env.GATSBY_SANITY_PROJECT_ID,
	dataset: process.env.GATSBY_SANITY_DATASET,
	token: process.env.GATSBY_SANITY_API_TOKEN,
	useCdn: false,
	apiVersion: '2021-09-17'
})

const markDeletedVariants = async () => {
	try {
		const results = await client.fetch(`*[_type=="variant"]{
      _id,
      "parentProducts": *[_type=='product' && references(^._id)]{
        title,
        'deleted': content.shopify.deleted
      }
    }`)
		const unreferencedVariants = results
			?.filter(result => result.parentProducts.length === 0 || result.parentProducts[0]?.deleted )
			.map(result => result._id)
      
		let tx = client.transaction()
  
		unreferencedVariants.forEach(variantId => {
			tx = tx.patch(variantId, patch => patch.set({'content.shopify.deleted': true}))
		})

		await tx.commit()
	} catch(error) {
		console.log(error)
	}
}

export default async function handler(req, res){
	if (req.method !== 'POST' || !req.body) {
		return res.status(400).json({ error: 'Bad request body' })
	}

	console.log(req.body)

	let data
	const hmac = req.headers['x-shopify-hmac-sha256']

	// parse data and check hmac

	try {
		data = req.body
		const generatedHash = crypto
			.createHmac('sha256', process.env.GATSBY_SHOPIFY_SECRET)
			.update(JSON.stringify(req.body))
			.digest('base64')
		if (generatedHash !== hmac) {
			console.error('Invalid webhook')
			// return res.status(400, { error: 'Invalid Webhook' })
		}
	} catch (error) {
		console.error('JSON parsing error:', error)
		return res.status(400).json({ error: 'Bad request body' })
	}

	// Shopify sends both Product Updates/Creations AND deletions as POST requests
	// Product Updates & Creations contain the entire product body, including titles, tags, images, handle, etc.
	// Product Deletions only contain a singular 'id'

	const id = data.id.toString()
    
	// Build our initial product
	const product = {
		_type: 'product',
		_id: id
	}

	let isUnpublished = false

	let productAvailable = false

	// Check all variants for any availability
	data.variants.forEach(v => {
		if(v.inventory_quantity > 0 || v.inventory_policy === 'continue' || v.inventory_management === null){
			productAvailable = true
		}
	})

	try {
		// check the status of the document

		const results =  await client.fetch(`*['drafts.${id}' == _id || '${id}' == _id]`)
    
		if(results.length === 0){
			// new product that doesn't exist in the portal
			product._id = `drafts.${id}`
			isUnpublished = true
		} else if(results.length === 2){
			// published with draft
			product._id = `drafts.${id}`
		} else if(results.length === 1){
			if(results[0]._id.includes('drafts')){
				// unpublished with draft
				product._id = `drafts.${id}`
				isUnpublished = true
			} else {
				// published with no draft
			}
		}

	} catch(error) {
		console.log(error)
	}

	if (data.hasOwnProperty('title') && data.hasOwnProperty('handle')) {

		const productObject = {
			'title': data.title,
			'slug.current': data.handle,
			'content.shopify.productId': data.id,
			'content.shopify.status': data.status,
			'content.shopify.available': productAvailable,
			'options': data.variants?.length > 1 ? data.options?.map(option => ({
				_type: 'productOption',
				_key: option.name,
				name: option.name,
				position: option.position,
				values: option.values
			})) : undefined,
		}

		try {

			let tx = client.transaction()
			tx = tx.createIfNotExists(product)
			tx = tx.patch(product._id, patch => patch.set(productObject))

			// if there's a draft also patch the published doc
			if(id !== product._id && !isUnpublished) tx = tx.patch(id, patch => patch.set(productObject))
  
			console.log(`Successfully updated/patched ${data.title} in Sanity`)
  
			const productVariantObjects = data.variants.map(variant => ({
				'title': data.title + (variant.title !== 'Default Title' ? ` (${variant.title})` : ''),
				'content.shopify.variantId': variant.id,
				'content.shopify.productId': id,
				'content.shopify.productTitle': data.title,
				'content.shopify.productSlug': data.handle,
				'content.shopify.variantTitle': variant.title,
				'content.shopify.sku': variant.sku,
				'content.shopify.price': variant.price,
				// setting the inventoyr policy to continue if inventory isn't tracked by Shopify
				'content.shopify.inventoryPolicy': variant.inventory_management === null ? 'continue' : variant.inventory_policy,
				'content.shopify.inventoryQuantity': variant.inventory_quantity,
				'content.shopify.available': variant.inventory_quantity > 0 || variant.inventory_policy === 'continue' || variant.inventory_management === null,
				'options': data.options?.filter(option => option.name !== 'Title').map((option, index) => ({
					_type: 'variantOption',
					_key: option.name,
					name: option.name,
					value: variant[`option${index + 1}`],
				})),
			}))
  
			// Create / update the variants

			const productVariants = data.variants.map(variant => ({
				_type: 'variant',
				_id: variant.id.toString()
			}))
  
			productVariants.forEach((variant, i) => {
				tx = tx.createIfNotExists(variant)
				tx = tx.patch(variant._id, v => v.set(productVariantObjects[i]))
			})
  
			console.log(`Updated/patched variants ${data.variants.map(v => v.title).join(', ')} in Sanity`)
  
			tx = tx.patch(product._id, p => p.set({
				'content.variants': data.variants.map(variant => ({
					_type: 'reference',
					_ref: variant.id.toString(),
					_key: variant.id.toString(),
				}))
			}))

			// if there's a draft and a published doc also patch the published doc
			if(id !== product._id && !isUnpublished){
				tx = tx.patch(id, p => p.set({
					'content.variants': data.variants.map(variant => ({
						_type: 'reference',
						_ref: variant.id.toString(),
						_key: variant.id.toString(),
					}))
				}))
			}
  
			console.log(`Added variant references to ${data.title} in Sanity`)

			const result = await tx.commit()
			await markDeletedVariants()

			// trigger a rebuild, in case inventory was updated, you may want to turn this off for high volume sites, and see the useInventory hook isntead
			await axios(`https://api.netlify.com/build_hooks/${netlifyBuildHookId}`, {
				method: 'POST', 
			})
				.then(() => console.log('Triggered a Netlify rebuild'))
				.catch((error) => {
					console.error('Error:', error)
				})

			return res.status(200).json({ body: JSON.stringify(result) })

		} catch ( error ) {
			console.error(error)
			return res.status(500).json({ error: 'An internal error server has occured' })
		}
  
	} else if (data.hasOwnProperty('id') && (!data.hasOwnProperty('title') && !data.hasOwnProperty('handle'))) {
		// this is triggered if Shopify sends a Product Deletion webhook that does NOT contain anything besides an ID

		try {
			let tx = client.transaction()
			tx = tx.patch(product._id, patch => patch.set({ 'content.shopify.deleted': true }))
			// if there's a draft also patch the published doc
			if(id !== product._id && !isUnpublished) tx = tx.patch(id, patch => patch.set({ 'content.shopify.deleted': true }))

			const result = await tx.commit()
			await markDeletedVariants()
			console.log(`successfully marked ${data.id} as 'deleted'`)
			return res.status(200).json({ body: JSON.stringify(result) })

		} catch(error) {
			console.log(error)
			return res.status(500).json({ error: 'An internal error server has occured' })
		}

	}
}
