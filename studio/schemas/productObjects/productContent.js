import Tabs from 'sanity-plugin-tabs'

export default {
	title: 'Product Content',
	name: 'productContent',
	type: 'object',
	inputComponent: Tabs,
	fieldsets: [
		{ name: 'main', title: 'Main' },
		{ name: 'variants', title: 'Variants' },
		{ name: 'shopify', title: 'Shopify' },
		{ name: 'seo', title: 'SEO' },
	],
	fields: [
		{
			name: 'variants',
			title: 'Variants',
			type: 'array',
			readOnly: true,
			fieldset: 'variants',
			description: 'Pulled from Shopify',
			of: [{ type: 'reference', to: { type: 'variant' } }]
		},
		{
			type: 'shopifyProductInfo',
			name: 'shopify',
			title: ' ',
			fieldset: 'shopify'
		},
		{
			type: 'seo',
			name: 'seo',
			fieldset: 'seo'
		},
	]
}
