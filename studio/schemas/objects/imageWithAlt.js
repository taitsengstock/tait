import { IoImage } from 'react-icons/io5'

export default {
	title: 'Image',
	name: 'imageWithAlt',
	type: 'image',
	icon: IoImage,
	fields: [
		{
			name: 'alt',
			type: 'string',
			title: 'Alternative text',
			description: 'Important for SEO and accessiblity.',
			// validation: Rule => Rule.error('You have to fill out the alternative text.').required(),
		},
	],
	preview: {
		select: {
			title: 'alt',
			media: 'asset',
		},
		prepare({ title, media }) {
			return {
				title: title ?? 'Image',
				media,
			}
		},
	},
}