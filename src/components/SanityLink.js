import React from 'react'
import PropTypes from 'prop-types'
import { Link } from 'gatsby'
import resolveLink from '~utils/resolveLink'

const SanityLink = ({ className, link, children }) => {
	if(link.linkType === 'internal'){
		return (
			<Link className={className} to={resolveLink(link.document)}>
				{children}
			</Link>
		)
	} else {
		return (
			<a href={link.url} target={link.blank ? '_blank' : '_self'} rel='noreferrer'>
				{children}
			</a>
		)
	}
}

SanityLink.propTypes = {
	className: PropTypes.string,
	link: PropTypes.object,
	children: PropTypes.node,
}

export default SanityLink