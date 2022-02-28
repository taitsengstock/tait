import link from './link'

export default {
	name: 'richText',
	type: 'array',
	title: 'Rich Text',
	of: [
		{
			type: 'block',
			title: 'Block',
			// Styles let you set what your user can mark up blocks with. These
			// corrensponds with HTML tags, but you can set any title or value
			// you want and decide how you want to deal with it where you want to
			// use your content.
			styles: [
				{title: 'Normal', value: 'normal'},
				// {title: 'Large Heading', value: 'h2'},
				// {title: 'Small heading', value: 'h3'},
				// {title: 'Quote', value: 'blockquote'}
			],
			lists: [{title: 'Bullet', value: 'bullet'}, {title: 'Number', value: 'number'}],
			// Marks let you mark up inline text in the block editor.
			marks: {
				// Decorators usually describe a single property – e.g. a typographic
				// preference or highlighting by editors.
				decorators: [{title: 'Strong', value: 'strong'}, {title: 'Emphasis', value: 'em'}],
				// Annotations can be any object structure – e.g. a link or a footnote.
				// I've imported link a weird way here, rather than using it as an object type I've directly imported the object. Sanity seems to be fine with it though?
				annotations: [
					link,
					// This is the normal way
					// {
					// 	name: 'internalLink',
					// 	type: 'object',
					// 	title: 'Internal Link',
					// 	blockEditor: {
					// 		icon: IoMdLink
					// 	},
					// 	fields: [
					// 		{
					// 			title: 'Page',
					// 			name: 'page',
					// 			type: 'reference',
					// 			to: [
					// 				{type: 'page'},
					// 			]
					// 		}
					// 	]
					// },
				]
			},
		},
		// // You can add additional types here. Note that you can't use
		// // primitive types such as 'string' and 'number' in the same array
		// // as a block type.
		// {
		//   type: 'basicImage',
		//   options: {hotspot: false}
		// }
	]
}
