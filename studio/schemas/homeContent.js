import Tabs from 'sanity-plugin-tabs'

export default {
	title: 'Home Content',
	name: 'homeContent',
	type: 'object',
	inputComponent: Tabs,
	fieldsets: [
		{ name: 'main', title: 'Main' },
		{ name: 'seo', title: 'SEO' },
	],
	fields: [
		{
			name: 'featuredProducts',
			type: 'array',
			of: [{type: 'reference', to: [{type: 'product', title: 'Product'}]}],
			validation: Rule => Rule.max(4),
			fieldset: 'main',
		},
		{
			name: 'promiseTitle',
			type: 'string',
			fieldset: 'main',
		},
		{
			name: 'promiseButtonText',
			type: 'string',
			fieldset: 'main',
		},
		{
			name: 'promiseButtonLink',
			type: 'link',
			fieldset: 'main',
		},
		{
			name: 'promiseTiles',
			type: 'array',
			fieldset: 'main',
			of: [{type: 'promiseTile'}]
		},
		{
			name: 'featuredProduct',
			type: 'reference',
			to: [{type: 'product'}],
			fieldset: 'main',
		},
		{
			name: 'featuredRareBooks',
			type: 'array',
			of: [{
				type: 'reference', 
				to: [{type: 'product', title: 'Product'}],
				options: {
					filter: '$categoryTitle in content.categories[]->.title',
					filterParams: {categoryTitle: 'Rare Books'}
				}
			}],
			validation: Rule => Rule.max(8),
			fieldset: 'main',
		},
		{
			name: 'refineTitle',
			type: 'string',
			fieldset: 'main',
		},
		{
			type: 'seo',
			name: 'seo',
			fieldset: 'seo'
		},
	]
}
