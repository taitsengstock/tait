import link from './link'

export default {
	name: 'basicTextWithLinks',
	type: 'array',
	title: 'Text',
	of: [
		{
			type: 'block',
			title: 'Block',
			styles: [
				{title: 'Normal', value: 'normal'},
			],
			lists: [],
			// Marks let you mark up inline text in the block editor.
			marks: {
				// Decorators usually describe a single property – e.g. a typographic
				// preference or highlighting by editors.
				decorators: [],
				// Annotations can be any object structure – e.g. a link or a footnote.
				annotations: [link]
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
