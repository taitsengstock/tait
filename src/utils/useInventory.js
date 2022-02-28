// Usage:
// const inventory = useInventory(slug?.current)
// {46785363854: 1, 4758943709540: 5 ...}

import { useEffect, useState } from 'react'
import axios from 'axios'

const useInventory = slug => {

	const [inventory, setInventory] = useState(null)

	useEffect(() => {

		if (!slug || window.location.host === 'localhost:8000') return null

		const convertId = id => atob(id).split('/').at(-1)

		axios({
			url: '/.netlify/functions/inventory-check',
			method: 'post',
			data: JSON.stringify({slug})
		}).then(result => {
			// const id = convertId(result.data.product.id)
			const variants = result.data.product?.variants?.edges?.map(edge => ({
				id: convertId(edge.node.id),
				qty: edge.node.quantityAvailable,
				available: edge.node.availableForSale
			}))

			let inv = {}
			variants?.forEach(v => {
				inv = {
					...inv,
					[v.id]: v.qty
				}
			})
			setInventory(inv)
		})

	}, [slug])

	return inventory
}

export default useInventory