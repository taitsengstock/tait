import { FiCheckCircle } from 'react-icons/fi'

export default {
	title: 'Variant Option',
	name: 'variantOption',
	type: 'object',
	icon: FiCheckCircle,
	fields: [
		{
			title: 'Name',
			name: 'name',
			type: 'string'
		},
		{
			title: 'Value',
			name: 'value',
			type: 'string',
		}
	],
	preview: {
		select: {
			title: 'name',
			subtitle: 'value'
		}
	}
}
