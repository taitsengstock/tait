import ShopifyClient from 'shopify-buy'
import Cookies from 'js-cookie'


const client = ShopifyClient.buildClient({
	storefrontAccessToken: process.env.GATSBY_SHOPIFY_TOKEN,
	domain: process.env.GATSBY_SHOPIFY_STORE
})

const prepareCheckout = (cart) => {
	client.checkout.create().then((checkout) => {
		Cookies.set('DOT_CHECKOUT_ID', checkout.id)

		const lineItemsToAdd = cart.map(item => ({
			variantId: btoa(`gid://shopify/ProductVariant/${item.content?.shopify?.variantId}`),
			quantity: item.qty,
		}))

		client.checkout.addLineItems(checkout.id, lineItemsToAdd).then((checkout) => {
			window.location = checkout.webUrl
		})
      
	}).catch(error => console.log(error))
}

export default prepareCheckout