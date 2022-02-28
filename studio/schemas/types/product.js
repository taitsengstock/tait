export default {
	name: 'product',
	title: 'Product',
	type: 'document',
	__experimental_actions: ['update', 'publish', 'delete'],
	fields: [
		{
			name: 'title',
			title: 'Title',
			type: 'string',
			readOnly: true,
			description: 'Pulled from Shopify' 
		},
		{
			name: 'slug',
			title: 'Slug',
			type: 'slug',
			readOnly: true,
			description: 'Pulled from Shopify',
			options: {
				maxLength: 96
			},
			validation: Rule => Rule.required()
		},
		{
			title: 'Options',
			name: 'options',
			type: 'array',
			// hidden: true,
			readOnly: true,
			of: [{ type: 'productOption' }],
		},
		{
			name: 'content',
			title: 'Content',
			type: 'productContent',
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