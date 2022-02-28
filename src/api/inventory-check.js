import axios from 'axios'

import {
	shopifyConfig,
	GATSBY_SHOPIFY_GRAPHQL_URL
} from './requestConfig'

export default async function handler(req, res){

	console.log(req.headers)

	if (req.method !== 'POST' || !req.body) {
		return res.status(400).json({ error: 'Bad request' })
	}

	let data

	try {
		data = JSON.parse(req.body)
	} catch (error) {
		console.log('JSON parsing error:', error)
		return res.status(400).json({ error: 'Bad request body' })
	}

	try {

		let productData = await axios({
			url: GATSBY_SHOPIFY_GRAPHQL_URL,
			method: 'POST',
			headers: shopifyConfig,
			data: {
				query: `
          query InventoryQuery {
            product(handle: "${data.slug}"){
              title
              id
              variants(first: 99) {
                edges {
                  node {
                    id
                    quantityAvailable
                  }
                }
              }
            }
          }
          `
			}
		})
		return res.status(200).json({product: productData.data.data.product})
	} catch (err) {
		console.error(err)
		return res.status(500).json({ error: err.message })
	}
  
}

