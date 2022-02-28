import React, { useState, useRef, useEffect } from 'react'
import PropTypes from 'prop-types'
import { css } from '@emotion/react'
import { getGatsbyImageData } from 'gatsby-source-sanity'
import calculateStyles from '@sanity/imagetool/calculateStyles'

const sanityConfig = {
	projectId: process.env.GATSBY_SANITY_PROJECT_ID,
	dataset: process.env.GATSBY_SANITY_DATASET
}

const Image = ({ image, maxWidth, aspectRatio, className }) => {
	let id = image?.asset?._id
	
	const [loaded, setLoaded] = useState(false)
	const imageRef = useRef()

	useEffect(() => {
		if (imageRef?.current?.complete) setLoaded(true)
	}, [imageRef])

	if(!id) return null

	let assetData = getGatsbyImageData(
		id, 
		{ 
			maxWidth: maxWidth || 3000, 
			aspectRatio: image.hotspot ? null : aspectRatio, 
			layout: 'fullWidth' 
		}, 
		sanityConfig
	)

	let styles = calculateStyles({
		hotspot: image.hotspot,
		crop: image.crop,
		image: {height: assetData.height, width: assetData.width},
		container: {aspectRatio: aspectRatio ?? null},
	})

	return (
		<div className={className}>
			<div style={{...styles.container, height: 'auto'}}>
				<div style={styles.padding} />
				<div style={styles.crop}>
					<img
						src={assetData.images.fallback.src}
						srcSet={assetData.images.fallback.srcSet}
						style={styles.image}
						alt={image.alt ?? ''}
						onLoad={() => setLoaded(true)}
						ref={imageRef}
						css={css`
                opacity: ${loaded ? 1 : 0};
                transition: opacity 0.35s;
              `}
					/>
				</div>
			</div>
		</div>
	)
}

Image.propTypes = {
	image: PropTypes.shape({
		asset: PropTypes.shape({
			_id: PropTypes.string.isRequired,
		}),
		alt: PropTypes.string,
		hotspot: PropTypes.object,
		crop: PropTypes.object,
	}),
	aspectRatio: PropTypes.number,
	maxWidth: PropTypes.number,
	className: PropTypes.string,
}

export default Image
