import React from 'react'
import PropTypes from 'prop-types'
import { Helmet } from 'react-helmet'
import useSiteSettings from '~utils/useSiteSettings'
import formatPageTitle from '~utils/formatPageTitle'
import imageUrlBuilder from '@sanity/image-url'
import sanityClient from '~utils/sanityClient'

const builder = imageUrlBuilder(sanityClient)

const Seo = ({ description, lang, meta, title, metaTitle, image }) => {

	const { siteTitle, siteMetaDescription, siteSocialImage } = useSiteSettings()

	const metaDescription = description || siteMetaDescription
	const metaImage = image ? builder.image(image).width(1200) : builder.image(siteSocialImage).width(1200)
	const formattedTitle = formatPageTitle(title, metaTitle, siteTitle)
 
	return (
		<Helmet
			htmlAttributes={{
				lang,
			}}
			title={formattedTitle}
			meta={[
				{
					name: 'description',
					content: metaDescription,
				},
				{
					property: 'og:title',
					content: formattedTitle,
				},
				{
					property: 'og:description',
					content: metaDescription,
				},
				{
					property: 'og:type',
					content: 'website',
				},
				{
					property: 'og:image',
					content: metaImage,
				},
				{
					name: 'twitter:card',
					content: 'summary',
				},
				{
					name: 'twitter:title',
					content: formattedTitle,
				},
				{
					name: 'twitter:description',
					content: metaDescription,
				},
			].concat(meta)}
		/>
	)
}

Seo.defaultProps = {
	lang: 'en',
	meta: [],
	description: '',
}

Seo.propTypes = {
	description: PropTypes.string,
	lang: PropTypes.string,
	meta: PropTypes.arrayOf(PropTypes.object),
	title: PropTypes.string,
	image: PropTypes.object,
	metaTitle: PropTypes.string,
}

export default Seo
