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
			type: 'seo',
			name: 'seo',
			fieldset: 'seo'
		},
	]
}
