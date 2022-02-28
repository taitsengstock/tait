import React, { useState, useEffect, useLayoutEffect, useRef } from 'react'
import PropTypes from 'prop-types'
import { graphql, navigate } from 'gatsby'
import { css } from '@emotion/react'
import styled from '@emotion/styled'
import Seo from '~components/Seo'
import Section from '~components/Section'
import DataViewer from '~utils/DataViewer'
import { useCart } from '~context/siteContext'
import { useLocation } from '@reach/router'
import { useQueryParams, StringParam } from 'use-query-params'

const Product = ({ data }) => {
	const { title, content, options } = data.sanityProduct
	const { addItem, openCart } = useCart()
	const variantSelectorRef = useRef()
	const [params] = useQueryParams({v: StringParam})
	const location = useLocation()
	const [selectedVariant, setSelectedVariant] = useState()
	const [selectedOptions, setSelectedOptions] = useState()

	const add = () => {
		addItem({
			...selectedVariant, 
			qty: 1,
			// We don't want to limit the maxQty if the policy is to continue selling
			maxQty: selectedVariant?.content.shopify.inventoryPolicy === 'continue' ? null : selectedVariant?.content.shopify.inventoryQuantity
		})
		openCart()
	}

	function navigateToVariant(variant){
		setSelectedVariant(variant)
		navigate(location.pathname + `${ variant ? `?v=${variant.content.shopify.variantId}` : ''}`,
			{ state: { disableScrollUpdate: true }, replace: true }
		)
	}

	const findVariantByOptions = () => content.variants.find(v => {
		let match = true
		v.options.forEach(o => {
			if(o.value !== selectedOptions[o.name]) match = false
		})
		return match
	})

	const findVariantById = id => 
		content.variants.find(v => v.content.shopify.variantId.toString() === id)

	// Navigate to the new variant each time the options change
	useEffect(() => {
		if(selectedOptions){
			const newVariant = findVariantByOptions()
			navigateToVariant(newVariant)
		}
		// eslint-disable-next-line
	}, [selectedOptions])

	// Helper function to convert options array in to obejct
	const optionsToObject = opts => opts.reduce(function(map, obj) {
		map[obj.name] = obj.value
		return map
	}, {})

	// Set the variant to on load
	useLayoutEffect(() => {
		let newVariant
		if(!params.v){
			newVariant = content.variants[0]
		} else {
			newVariant = findVariantById(params.v)
		}

		setSelectedOptions(optionsToObject(newVariant.options))
		navigateToVariant(newVariant)

		// Set correct values on selects, if not using native selects this bit will need to change
		const selects = Array.from(variantSelectorRef.current.children).map(child => child.lastChild)
		selects.forEach((select, i) => {
			select.value = newVariant.options[i].value
		})
		// eslint-disable-next-line
	}, [params.v])

	const available = selectedVariant?.content.shopify.available

	return(
		<>
			<Seo 
				title={title}
				metaTitle={content?.seo?.metaTitle}
				description={content?.seo?.metaDescription}
				image={content?.seo?.socialImage}
			/>
			<Section>
				{title}

				<VariantSelector ref={variantSelectorRef}>
					{options?.map(o =>
						<div key={o.name}>
							<label htmlFor={o.name}>{o.name}</label>
							<select name={o.name} id={o.name} onChange={e => setSelectedOptions({...selectedOptions, [o.name]: e.target.value})}>
								{o.values?.map(value => 
									<option key={o.name + value}>{value}</option>
								)}
							</select>
						</div>
					)}
				</VariantSelector>

				<div>
					Selected Variant: {selectedVariant?.content.shopify.variantTitle ?? 'No match'} <br/>
					Quantity: {selectedVariant?.content.shopify.inventoryQuantity} <br/>
				</div>
				<button onClick={available ? () => add() : null} css={css`
					pointer-events: ${available ? 'all' : 'none'};
				`}>
					{available ? 'Add to Cart' : 'Sold Out'}
				</button>
			</Section>

			<DataViewer data={content} name="content"/>
		</>
	)
}

export const query = graphql`
	query ProductQuery($slug: String) {
		sanityProduct(slug: {current: {eq: $slug}}) {
			title
			slug{
				current
			}
			options {
				name
				values
			}
			content {
				shopify {
					deleted
					productId
					status
				}
				variants {
					_type
					content {
						shopify {
							price
							variantId
							variantTitle
							inventoryQuantity
							inventoryPolicy
							available
							productSlug
						}
					}
					options {
						name
						value
					}
				}
			}
		}
	}
`

const VariantSelector = styled.form`
	max-width: 300px;
	padding: 30px 0;
	grid-column: 1 / 3;
`

Product.propTypes = {
	data: PropTypes.object,
	daat: PropTypes.object, 
}

export default Product