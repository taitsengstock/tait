export default {
	title: 'Shopify Product Info',
	name: 'shopifyProductInfo',
	type: 'object',
	description: 'Basic product data, pulled from Shopify.',
	fields: [
		{
			name: 'deleted',
			title: 'Deleted from Shopify',
			type: 'boolean',
			description: 'This flag will be automatically set if the product is deleted in Shopify',
			readOnly: true,
			initialValue: false
		},
		{
			name: 'status',
			title: 'Shopify Status',
			type: 'string',
			readOnly: true,
		},
		{
			name: 'productId',
			title: 'Product ID',
			type: 'number',
			readOnly: true,
		},
		{
			name: 'available',
			type: 'boolean',
			description: 'Pulled from Shopify. Automatically set based variant inventory policy & quantity.',
			readOnly: true
		},
	]
}
