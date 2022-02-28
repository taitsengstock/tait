import Tabs from 'sanity-plugin-tabs'

export default {
	title: 'Page Content',
	name: 'pageContent',
	type: 'object',
	inputComponent: Tabs,
	fieldsets: [
		{ name: 'main', title: 'Main' },
		{ name: 'seo', title: 'SEO' },
	],
	fields: [
		{
			type: 'richText',
			name: 'text',
			fieldset: 'main'
		},
		{
			type: 'seo',
			name: 'seo',
			fieldset: 'seo'
		},
	]
}
