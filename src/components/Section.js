import React, { useState, useEffect } from 'react'
import PropTypes from 'prop-types'
import styled from '@emotion/styled'
import { mobile } from '~styles/global'

const Section = ({ children, className }) =>
	<Wrap className={className}>
		<Container>
			{children}
		</Container>
		<Visible />
	</Wrap>

Section.propTypes = {
	children: PropTypes.node,
	className: PropTypes.string,
}

const Visible = () => {
	const isDev = process.env.NODE_ENV === 'development' && !process.env.GATSBY_PREVIEW
	const [visible, setVisible] = useState(false)

	useEffect(() => {
		const handleKeydown = e => 
			e.code === 'KeyG' && setVisible(prevVis => !prevVis)
      
		isDev && document.addEventListener('keydown', handleKeydown)
		return isDev && document.addEventListener('keydown', handleKeydown)
	}, [isDev])

	if (!isDev || !visible) return null 

	return (
		<VisibleWrap>
			{[...(Array(12))].map((c, i) => <Cell key={i}/>)}
		</VisibleWrap>
	)
}
 


const Wrap = styled.div`
  position: relative;
`

const Container = styled.div`
  display: grid;
  grid-template-columns: repeat(12, 1fr);
  grid-column-gap: 30px;
  padding: 0 60px;
  ${mobile}{
    grid-column-gap: 20px;
    padding: 0 20px;
  }
`

const VisibleWrap = styled(Container)`
  position: absolute;
  width: 100%;
  top: 0;
  bottom: 0;
  box-sizing: border-box;
  z-index: 9999;
  pointer-events: none;
`

const Cell = styled.div`
  background: grey;
  opacity: 0.1;
  grid-column: span 1;
  height: 100%;
`

export default Section
