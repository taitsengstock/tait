import React from 'react'
import PropTypes from 'prop-types'
import { Link, navigate } from 'gatsby'
import styled from '@emotion/styled'

const Header = ({ className }) => {
	return(
		<Wrap className={className}>
			<nav>
				<Link to={'/'}>Home</Link>
				<Link to={'/example-page'}>Example Page</Link>
				<button onClick={() => navigate(-1)}>Back</button>
			</nav>
		</Wrap>
	)
}

const Wrap = styled.header`
  position: fixed;
  top: 0;
  right: 0;
  z-index: 100;
	padding: var(--m);
	nav > * {
		display: inline-block;
		margin-left: var(--xs);
	}
`

Header.propTypes = {
	className: PropTypes.string,
}

export default Header
