import React, { useState } from 'react'
import { Link } from 'gatsby'
import PropTypes from 'prop-types'
import { css, Global } from '@emotion/react'
import styled from '@emotion/styled'
import { mobile } from '~styles/global'
import { useCart } from '~context/siteContext'
import resolveLink from '~utils/resolveLink'
import Image from '~components/Image'
import Incrementer from '~components/Incrementer'
import prepareCheckout from '~utils/prepareCheckout'

const Item = ({ variant }) => {

	const { updateQty, removeItem } = useCart()

	return(
		<LineItem>
			<ProductImage  asset={variant.image} aspectRatio={1} css={css``}/>
			<div>Variant id {variant.content.shopify.variantId}</div>
			<Link to={resolveLink(variant)}>Variant Title {variant.content.shopify.variantTitle}</Link>
			<div>Price {variant.content.shopify.price}</div>
			<div>Qty {variant.qty}</div>
			<div>Max qty {variant.maxQty}</div>
      
			<Incrementer 
				onChange={value => updateQty(variant.content.shopify.variantId, value)}
				initialValue={variant.qty}
				maxValue={variant.maxQty}
			/>
			<button onClick={() => removeItem(variant.variantId)}>Remove</button>
		</LineItem>
	)
}

Item.propTypes = {
	variant: PropTypes.object,
}

const Cart = ({ open, className }) => {

	const { cartTotal, cart, closeCart } = useCart()
	const [loading, setLoading] = useState(false)

	const loadCheckout = () => {
		setLoading(true)
		prepareCheckout(cart)
	}

	return(
		<>
			<Global styles={css`
        html{
          overflow-y: ${open ? 'hidden' : 'scroll'};
        }
      `}/>
			<Wrap 
				className={className}
				css={css`
          transform: ${open ? 'translateX(0)' : 'translateX(100%)'};
          pointer-events: ${open ? 'all' : 'none'};
        `}
			>
				<div>
					{cart.length ? 
						cart.map(variant => (
							<Item variant={variant} key={variant.content.shopify.variantId}/>
						))
						:
						<p>
            Your Cart is Empty
						</p> 
					}
				</div>
				{cart.length ? 
					<>
						<div>Total: ${cartTotal().toFixed(2)}</div>
						<button onClick={() => loadCheckout(cart)}>{loading ? 'Loading...' : 'Check out'}</button>
					</>
					:
					<button onClick={() => closeCart()}>
          Keep Shopping
					</button>
				}
        
			</Wrap>
		</>
	)
}

const Wrap = styled.div`
  position: fixed;
  z-index: 3;
  width: 600px;
  top: 0;
  right: 0;
  bottom: 0;
  transition: transform 0.5s;
  box-sizing: border-box;
  ${mobile}{
    width: 100%;
  }
`
const LineItem = styled.div`
  display: grid;
`
const ProductImage = styled(Image)`
  .gatsby-image-wrapper{
    height: 100%; 
    object-fit: cover;
  }
`

Cart.propTypes = {
	open: PropTypes.bool,
	className: PropTypes.string,
}

export default Cart
