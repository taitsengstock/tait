import sanityClient from '@sanity/client'

const client = sanityClient({
	projectId: process.env.GATSBY_SANITY_PROJECT_ID,
	dataset: process.env.GATSBY_SANITY_DATASET,
	apiVersion: '2021-07-22',
	useCdn: false
})

export default client