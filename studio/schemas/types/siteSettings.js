import Tabs from 'sanity-plugin-tabs'

export default {
	name: 'siteSettings',
	title: 'Site Settings',
	type: 'document',
	__experimental_actions: ['update', 'publish',  /*'create', 'delete'*/ ],
	groups: [
		{ name: 'general', title: 'General' },
		{ name: 'seo', title: 'SEO' },
	],
	fields: [
		{
			name: 'siteTitle',
			title: 'Site Title',
			type: 'string',
			group: 'general',
		},
		{
			name: 'metaDescription',
			title: 'Meta Description',
			type: 'string',
			description: 'Appears in Google results and when sharing the site. Should be between 50–160 characters',
			group: 'seo',
		},
		{
			name: 'socialImage',
			title: 'Social Image',
			type: 'image',
			description: 'Preview image for Twitter, Facebook and in iMessages. Suggested size 1200 × 630.',
			group: 'seo',
			options: {
				hotspot: true
			},
		}
	],
	preview: {
		select: {
			title: 'siteTitle',
		}
	}
}
