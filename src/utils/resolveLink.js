const resolveLink = (doc) => {
	if(!doc) return null
	const type = doc._type
	const slug = doc.slug?.current

	switch (type) {
	case 'product':
		return `/products/${slug}`
	case 'variant':
		return `/products/${doc.content?.shopify?.productSlug}/?v=${doc.content?.shopify?.variantId}`
	case 'page':
		return `/${slug}`
	case 'homePage':
		return '/'
	default:
		return `/${slug}`
	}

}

export default resolveLink
