import React from 'react'
import PropTypes from 'prop-types'

const Video = ({ src, className }) => {
	return (
		<video className={className} playsInline autoPlay muted loop>
			<source src={src ?? './videos/placeholder.mp4'} />
		</video>
	)
}

Video.propTypes = {
	src: PropTypes.string,
	className: PropTypes.node,
}

export default Video
