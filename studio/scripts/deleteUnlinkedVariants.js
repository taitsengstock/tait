/**
 * THIS SCRIPT DELETES DATA!
 *
 * To use this script:
 * 1. Run `sanity dataset export` to backup your dataset before deleting a bunch of documents
 * 2. Run `sanity exec scripts/deleteUnlinkedVariants.js --with-user-token` to delete the documents
 *
 * NOTE: For the time being you should not delete more than ~1000 documents in one transaction. This will change in the future.
 * See docs:https://www.sanity.io/docs/http-api/http-mutations#deleting-multiple-documents-by-query
 */

import sanityClient from 'part:@sanity/base/client'

const client = sanityClient.withConfig({apiVersion: '2021-06-07'})

//  client
//    .delete({query: '*[_type == "variant" && content.shopify.deleted][0...999]'})
//    .then(console.log)
//    .catch(console.error)

const deleteVariants = async () => {
	try {
		const results = await client.fetch(`*[_type=="variant"]{
      _id,
      "parentProducts": *[_type=='product' && references(^._id)]{
        title,
      }
    }`)
		const unreferencedVariants = results
			?.filter(result => result.parentProducts.length === 0)
			.map(result => result._id)
      
		let tx = client.transaction()
  
		unreferencedVariants.forEach(variantId => {
			tx = tx.delete(variantId)
		})

		const result = await tx.commit()
		console.log(result)
	} catch(error) {
		console.log(error)
	}
}

deleteVariants()