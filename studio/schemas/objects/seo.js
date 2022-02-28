export default {
	title: 'SEO',
	name: 'seo',
	type: 'object',
	fields: [
		{
			name: 'metaTitle',
			title: 'Meta Title',
			type: 'string',
			description: 'Replaces your document title for SEO purposes. Optional.',
			hidden: true,
			// Hidden by default, it's as simple as showing this field to allow SEO focused clients to edit their meta titles
		},
		{
			name: 'metaDescription',
			title: 'Meta Description',
			type: 'string',
			description: 'Appears in Google results and when sharing this page. Also used for internal site search. Should be between 50–160 characters.',
			validation: Rule => Rule.max(160)
		},
		{
			name: 'socialImage',
			title: 'Social Image',
			type: 'image',
			description: 'Preview image for Twitter, Facebook and in iMessages. Suggested size 1200 × 630.',
		},
	]
}
