import React, { useEffect } from 'react'
import PropTypes from 'prop-types'
import { css } from '@emotion/react'
import GlobalStyles from '~styles/global'
import Header from '~components/Header'
import Cart from '~components/Cart'
import Footer from '~components/Footer'
import smoothscroll from 'smoothscroll-polyfill'
import { mobile } from '~styles/global'
import Transition from '~components/Transition'
import { useSiteState, useCart } from '../context/siteContext'
import styled from '@emotion/styled'
import { useLocation } from '@reach/router'
import '~styles/static.css'

const Layout = ({ children }) => {

	const [siteState, setSiteState] = useSiteState()
	const { closeCart } = useCart()
	const location = useLocation()
  
	useEffect(() => {
		smoothscroll.polyfill()
	}, [])

	// Close the cart whenever the route changes
	useEffect(() => {
		closeCart()
		// eslint-disable-next-line
  }, [location])

	return (
		<>
			<GlobalStyles />
			<Header />
			<Cart open={siteState.cartOpen} />
			<main>
				<Transition>
					<div css={css`
            min-height: calc(100vh);
            display: flex;
            flex-direction: column;
            ${mobile}{
              padding-top: 76px;
              min-height: calc(100vh);
            }
          `}>
						{children}
						<Footer css={css`margin-top: auto;`}/>
					</div>
				</Transition>
			</main>
			<Overlay 
				onClick={() => setSiteState(prevState => ({
					...prevState,
					cartOpen: false,
				}))}
				css={css`
          pointer-events: ${siteState.cartOpen? 'all' : 'none'};
      `}/>
		</>
	)
}

const Overlay = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
`

Layout.propTypes = {
	children: PropTypes.node,
}

export default Layout
