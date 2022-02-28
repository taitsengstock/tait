import { IoDocumentOutline } from 'react-icons/io5'

export default {
	name: 'page',
	title: 'Page',
	type: 'document',
	icon: IoDocumentOutline,
	groups: [
		{ name: 'main', title: 'Main' },
		{ name: 'seo', title: 'SEO' },
	],
	fields: [
		{
			name: 'title',
			title: 'Title',
			type: 'string',
		},
		{
			name: 'slug',
			title: 'Slug',
			type: 'slug',
			options: {
				source: 'title',
				maxLength: 96
			},
			validation: Rule => Rule.required()
		},
		{
			name: 'note',
			type: 'note',
			options: {
				message: 'This is a note'
			}
		},
		{
			type: 'richText',
			name: 'text',
			group: 'main'
		},
		{
			type: 'seo',
			name: 'seo',
			group: 'seo'
		},
	],
	preview: {
		select: {
			title: 'title',
			media: 'seo.socialImage'
		}
	}
}