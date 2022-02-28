import { IoIosImage } from 'react-icons/io'

export default {
	title: 'Image',
	icon: IoIosImage,
	name: 'imageWithCaption',
	type: 'image',
	fields: [
		{
			name: 'caption',
			type: 'basicTextWithLinks',
			title: 'Caption',
		},
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
			media: 'asset',
			title: 'caption',
		}
	}
}