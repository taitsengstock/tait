export default {
	title: 'Shopify Variant Info',
	name: 'shopifyVariantInfo',
	type: 'object',
	fields: [
		{
			name: 'deleted',
			title: 'Deleted from Shopify',
			type: 'boolean',
			description: 'This flag will be automatically set if the variant is deleted in Shopify',
			readOnly: true,
			initialValue: false
		},
		{
			name: 'variantTitle',
			title: 'Variant Title',
			type: 'string',
			readOnly: true,
		},
		{
			name: 'variantId',
			title: 'Variant ID',
			type: 'number',
			description: 'Pulled from Shopify',
			readOnly: true,
		},
		{
			name: 'productTitle',
			type: 'string',
			readOnly: true,
		},
		{
			name: 'productId',
			title: 'Product ID',
			type: 'string',
			readOnly: true,
		},
		{
			name: 'productSlug',
			title: 'Product Slug',
			type: 'string',
			readOnly: true,
		},
		{
			name: 'price',
			type: 'string',
			description: 'Pulled from Shopify',
			readOnly: true
		},
		{
			name: 'inventoryQuantity',
			type: 'number',
			description: 'Pulled from Shopify',
			readOnly: true
		},
		{
			name: 'inventoryPolicy',
			type: 'string',
			description: 'Pulled from Shopify',
			readOnly: true
		},
		{
			name: 'available',
			type: 'boolean',
			description: 'Pulled from Shopify. Automatically set based inventory policy & quantity.',
			readOnly: true
		},
		{
			name: 'sku',
			title: 'SKU',
			type: 'string',
			description: 'Pulled from Shopify',
			readOnly: true
		},
	]
}
