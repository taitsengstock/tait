import Tabs from 'sanity-plugin-tabs'

export default {
	title: 'Variant Content',
	name: 'variantContent',
	type: 'object',
	inputComponent: Tabs,
	fieldsets: [
		{ name: 'main', title: 'Main' },
		{ name: 'shopify', title: 'Shopify' },
		{ name: 'seo', title: 'SEO' },
	],
	fields: [
		{
			type: 'shopifyVariantInfo',
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
