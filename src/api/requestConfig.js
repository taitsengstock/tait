const {
	GATSBY_SHOPIFY_TOKEN,
	GATSBY_SHOPIFY_GRAPHQL_URL,
} = process.env

const headers = {
	'Access-Control-Allow-Origin': '*',
	'Access-Control-Allow-Headers': 'Content-Type',
	'Content-Type': 'application/json'
}

const shopifyConfig = {
	'Content-Type': 'application/json',
	'X-Shopify-Storefront-Access-Token': GATSBY_SHOPIFY_TOKEN
}

const statusReturn = (code, body) => {
	return {
		statusCode: code,
		headers,
		body: JSON.stringify(body)
	}
}

const preparePayload = (query, v) => {
	return {
		query,
		variables: v
	}
}

export {
	headers,
	shopifyConfig,
	statusReturn,
	preparePayload,
	GATSBY_SHOPIFY_GRAPHQL_URL,
}
