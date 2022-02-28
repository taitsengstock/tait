// First, we must import the schema creator
import createSchema from 'part:@sanity/base/schema-creator'

// Then import schema types from any plugins that might expose them
import schemaTypes from 'all:part:@sanity/base/schema-type'

// Content Types
import siteSettings from './types/siteSettings'
import redirect from './types/redirect'
import page from './types/page'
import homePage from './types/homePage'
import product from './types/product'
import variant from './types/variant'

// Objects
import seo from './objects/seo'
import richText from './objects/richText'
import pageContent from './objects/pageContent'
import homeContent from './objects/homeContent'
import basicText from './objects/basicText'
import basicTextWithLinks from './objects/basicTextWithLinks'
import externalLink from './objects/externalLink'
import internalLink from './objects/internalLink'
import imageWithCaption from './objects/imageWithCaption'
import imageWithAlt from './objects/imageWithAlt'
import link from './objects/link'
import button from './objects/button'

// Product Objects
import productContent from './productObjects/productContent'
import variantContent from './productObjects/variantContent'
import shopifyProductInfo from './productObjects/shopifyProductInfo'
import shopifyVariantInfo from './productObjects/shopifyVariantInfo'
import productOption from './productObjects/productOption'
import variantOption from './productObjects/variantOption'

// Then we give our schema to the builder and provide the result to Sanity
export default createSchema({
	// We name our schema
	name: 'default',
	// Then proceed to concatenate our document type
	// to the ones provided by any plugins that are installed
	types: schemaTypes.concat([
		// Types
		siteSettings,
		redirect,
		page,
		product,
		variant,
		homePage,

		//Objects
		seo,
		richText,
		pageContent,
		basicText,
		basicTextWithLinks,
		internalLink,
		externalLink,
		imageWithCaption,
		imageWithAlt,
		link,
		button,
		homeContent,

		// Product Objects
		productContent,
		variantContent,
		shopifyProductInfo,
		shopifyVariantInfo,
		productOption,
		variantOption,

	])
})
