import React from 'react'
import { IoMdLink } from 'react-icons/io'

export default {
	title: 'Internal Link',
	name: 'internalLink',
	type: 'object',
	fields: [
		{
			title: 'Link Text',
			name: 'linkText',
			type: 'string'
		},
		{
			title: 'To',
			name: 'to',
			type: 'reference',
			to: [
				{type: 'page'},
			]
		}
	],
	preview: {
		select: {
			linkText: 'linkText',
		},
		prepare({ linkText }) {
			return {
				title: linkText,
				media: <IoMdLink />
			}
		}
	}
}
