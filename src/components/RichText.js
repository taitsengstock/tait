import React from 'react'
import PropTypes from 'prop-types'
import resolveLink from '~utils/resolveLink'
import { Link } from 'gatsby'
import BlockContent from '@sanity/block-content-to-react'

const serializers = {
	marks: {
		internalLink: props => {
			return <Link to={resolveLink(props.mark.page)}>{props.children}</Link> 
		},
		link: props => {
			if(props.mark.linkType === 'internal'){
				return <Link to={resolveLink(props.mark.document)}>{props.children}</Link> 
			} else {
				return <a href={props.mark?.url} target={props.mark.blank ? '_blank' : '_self'} rel='noreferrer'>{props.children}</a>
			}
		}
	}
}

const RichText = ({ content }) => <BlockContent blocks={content} serializers={serializers} ignoreUnknownTypes={true}/>

RichText.propTypes = {
	content: PropTypes.array,
}

export default RichText
