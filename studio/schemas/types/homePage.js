import { IoDocumentOutline } from 'react-icons/io5'

export default {
	name: 'homePage',
	title: 'Home',
	type: 'document',
	icon: IoDocumentOutline,
	__experimental_actions: ['update', 'publish'],
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