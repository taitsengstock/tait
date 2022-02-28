import React from 'react'
import { IoIosArrowRoundForward } from 'react-icons/io'

export default {
	title: 'External Link',
	name: 'externalLink',
	type: 'object',
	fields: [
		{
			title: 'Link Text',
			name: 'linkText',
			type: 'string'
		},
		{
			title: 'URL',
			name: 'url',
			type: 'url',
		}
	],
	preview: {
		select: {
			linkText: 'linkText',
		},
		prepare({ linkText }) {
			return {
				title: linkText,
				media: <IoIosArrowRoundForward />
			}
		}
	}
}
