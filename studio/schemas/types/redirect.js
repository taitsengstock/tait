import React from 'react'
import { IoSwapHorizontalOutline } from 'react-icons/io5'
export default {
	title: 'Redirect',
	name: 'redirect',
	type: 'document',
	fields: [
		{
			title: 'Internal Name',
			name: 'internalName',
			type: 'string',
			validation: Rule => Rule.required(),
		},
		{
			title: 'Match Rule',
			description:
        'The URL path to match. This is the “from” portion of the redirect. A “splat” (*) can be used to match any additional characters at the end of the line (e.g. `/blog/*`).',
			name: 'rule',
			type: 'string',
			validation: Rule =>
				Rule.required().regex(/^\//, { name: 'Must start with a `/`' }),
		},
		{
			title: 'Redirect Target',
			description:
        'The destination for the redirect. If a “splat” (*) was used in the match rule, it can be expanded in the target using `:splat` (e.g. `/blog/:splat`).',
			name: 'target',
			type: 'string',
			validation: Rule => Rule.required().regex(/^(\/|https?:\/\/)/),
		},
		{
			title: 'Redirect Type',
			description:
        'Both temporary and permanent redirects can be internal or external links. Rewrites can only be internal (i.e. to another page that is built in Sanity).',
			name: 'statusCode',
			type: 'string',
			options: {
				list: [
					{ title: 'Temporary (302)', value: '302' },
					{ title: 'Permanent (301)', value: '301' },
					{ title: 'Rewrite (200)', value: '200' },
				],
			},
			validation: Rule => Rule.required(),
		},
	],
	preview: {
		select: {
			title: 'internalName',
			rule: 'rule',
			target: 'target',
			statusCode: 'statusCode',
		},
		prepare: ({ title, rule, target, statusCode }) => ({
			title,
			subtitle: `${rule} → ${target} ${statusCode}`,
			media: <IoSwapHorizontalOutline />
		}),
	},
}
