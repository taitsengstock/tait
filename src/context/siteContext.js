import React, { useState, useContext, useEffect } from 'react'
import PropTypes from 'prop-types'
import ShopifyClient from 'shopify-buy'
import Cookies from 'js-cookie'

const client = ShopifyClient.buildClient({
	storefrontAccessToken: process.env.GATSBY_SHOPIFY_TOKEN,
	domain: process.env.GATSBY_SHOPIFY_STORE
})

const initialSiteState = {
	pageTitle: null,
	cart: [],
	cartOpen: false,
}

export const SiteContext = React.createContext({
	siteState: initialSiteState,
	setSiteState: undefined,
})

export const SiteStore = ({ children }) => {
	const [siteState, setSiteState] = useState(initialSiteState)
	const [init, setInit] = useState(false)

	useEffect(() => {
		if(init){
			localStorage.setItem('DOT_CART', JSON.stringify(siteState.cart), { expires: 5 })
		}
	}, [siteState, init])

	const loadCartFromCookie = () => {
		const cartCookie = localStorage.getItem('DOT_CART')
		if(cartCookie){
			setSiteState(prevState => ({
				...prevState,
				cart: JSON.parse(cartCookie)
			}))
		}
		setInit(true)
	}

	const destroyCart = () => {
		Cookies.remove('DOT_CHECKOUT_ID')
		localStorage.removeItem('DOT_CART')
		setInit(true)
	}

	useEffect(() => {
		const id = Cookies.get('DOT_CHECKOUT_ID')
		if(id){
			client.checkout.fetch(id).then(checkout => {
				if(checkout.completedAt){
					destroyCart()
				} else {
					loadCartFromCookie()
				}
			})
		} else {
			loadCartFromCookie()
		}
	}, [])

	return(
		<SiteContext.Provider value={{
			siteState: siteState,
			setSiteState: setSiteState
		}}>
			{children}
		</SiteContext.Provider>
	)
}

SiteStore.propTypes = {
	children: PropTypes.node,
}

// hook to access siteState globally
export const useSiteState = () => {
	const { siteState, setSiteState } = useContext(SiteContext)
	return [siteState, setSiteState]
}

// Cart functions
export const useCart = () => {

	const {siteState, setSiteState} = useContext(SiteContext)

	const addItem = item => {
		let itemIndex = siteState.cart.findIndex(c => c.content?.shopify?.variantId === item.content?.shopify?.variantId)
		if(itemIndex === -1){
			setSiteState(prevState => ({
				...prevState,
				cart:[
					...prevState.cart,
					item
				]
			}))
		}
		else if(!siteState.cart[itemIndex].maxQty || item.qty + siteState.cart[itemIndex].qty <= siteState.cart[itemIndex].maxQty){
			let newCart = siteState.cart
			newCart[itemIndex].qty += item.qty
			setSiteState(prevState => ({
				...prevState,
				cart: newCart
			}))
		}
	}

	const updateQty = (variantId, qty) => {
		let itemIndex = siteState.cart.findIndex(c => c.content?.shopify?.variantId === variantId)
		if(itemIndex === -1){
			return null
		}
		if(siteState.cart[itemIndex].maxQty && qty > siteState.cart[itemIndex].maxQty){
			return null
		}
		let newCart = siteState.cart
		newCart[itemIndex].qty = qty
		setSiteState(prevState => ({
			...prevState,
			cart: newCart
		}))
	}

	const removeItem = variantId => {
		let itemIndex = siteState.cart.findIndex(c => c.variantId === variantId)
		if(itemIndex === -1){
			return null
		}
		let newCart = siteState.cart
		newCart.splice(itemIndex, 1)
		setSiteState(prevState => ({
			...prevState,
			cart: newCart
		}))
	}

	const cartCount = () => {
		const reducer = (accumulator, currentValue) => accumulator + currentValue.qty
		return [...siteState.cart].reduce(reducer, 0)
	}

	const cartTotal = () => {
		const reducer = (accumulator, currentValue) => accumulator + currentValue.content.shopify.price * currentValue.qty
		return [...siteState.cart].reduce(reducer, 0)
	}

	const openCart = () => {
		setSiteState(prevState => ({
			...prevState,
			cartOpen: true
		}))
	}

	const closeCart = () => {
		setSiteState(prevState => ({
			...prevState,
			cartOpen: false
		}))
	}

	return {
		cart: siteState.cart,
		cartCount: cartCount,
		cartTotal: cartTotal,
		addItem: addItem,
		updateQty: updateQty,
		removeItem: removeItem,
		openCart: openCart,
		closeCart: closeCart,
	}
}