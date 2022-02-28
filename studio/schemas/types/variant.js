export default {
	name: 'variant',
	type: 'document',
	__experimental_actions: ['update', 'publish', 'delete'],
	fields: [
		{
			name: 'title',
			title: 'Title',
			type: 'string',
			readOnly: true,
		},
		{
			name: 'options',
			type: 'array',
			readOnly: true,
			of: [{type: 'variantOption'}]
		},
		{
			name: 'content',
			title: 'Content',
			type: 'variantContent',
		},
	],
	preview: {
		select: {
			title: 'title',
			media: 'content.image',
			deleted: 'content.shopify.deleted',
			available: 'content.shopify.available'
		},
		prepare({ title, media, deleted, available }){
			let subtitle
			if(deleted){
				subtitle = 'Deleted from Shopify'
			} else if (!available) {
				subtitle = 'Sold out'
			} else {
				subtitle = 'Available'
			}
			return {
				title: title,
				media: media,
				subtitle
			}
		}
	}
}
