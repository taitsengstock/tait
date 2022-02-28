import React from 'react'
import PropTypes from 'prop-types'
import { css } from '@emotion/react'
import styled from '@emotion/styled'
import Section from '~components/Section'

const Footer = ({ className }) => {
	return(
		<Wrap className={className}>
			<Section>
				<button 
					onClick={() => window.scrollTo({
						top: 0,
						left: 0,
						behavior: 'smooth'
					})}>
					Back to top
				</button>
			</Section>
		</Wrap>
	)
}

const Wrap = styled.footer`
	margin-bottom: var(--m);
	button{
		grid-column: span 12;
		text-align: left;
	}
`

Footer.propTypes = {
	className: PropTypes.string,
}

export default Footer
