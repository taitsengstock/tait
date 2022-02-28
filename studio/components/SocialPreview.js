/* eslint-disable react/prop-types */
import React, { useEffect, useState } from 'react'
import imageUrlBuilder from '@sanity/image-url'
import client from 'part:@sanity/base/client'
import resolveLink from '../../src/utils/resolveLink'
import formatPageTitle from '../../src/utils/formatPageTitle'
import { siteUrl } from '../../src/utils/constants'

const builder = imageUrlBuilder(client)

const SocialPreview = ({ document }) => {
	const doc = document.displayed
	const [siteSettings, setSiteSettings] = useState(null)

	const formattedTitle = formatPageTitle(doc.title, doc.content?.seo?.metaTitle, siteSettings?.siteTitle)

	useEffect(() => {
		client.withConfig({apiVersion: '2021-06-07'}).fetch('*[_type == "siteSettings"][0]').then(settings => {
			setSiteSettings(settings)
		})
	}, [])

	const imgSrc = !siteSettings ? null : builder.image(doc.content?.seo?.socialImage ?? siteSettings?.socialImage).width(1200).height(630).url()

	if(!siteSettings) return <p style={{marginLeft: '1em'}}>Loading...</p>
	return(
		<div style={{
			borderRadius: '8px',
			border: '1px solid #CDCDCD',
			margin: '40px auto 0',
			maxWidth: '500px',
			overflow: 'hidden'
		}}>
			{imgSrc && 
				<img 
					src={imgSrc}
					style={{
						width: '100%',
						borderBottom: '1px solid #CDCDCD',
					}}
				/>
			}
			<div style={{
				padding: '10px'
			}}>
				<p style={{fontWeight: 'bold', marginTop: 0, marginBottom: '10px'}}>{formattedTitle}</p>
				{doc.content?.seo?.metaDescription ?
					<p style={{marginTop: '10px'}}>{doc.content?.seo?.metaDescription}</p> :
					<p style={{marginTop: '10px'}}>{siteSettings.metaDescription}</p>
				}
				<h5 style={{fontWeight: 400, marginBottom: 0}}>{siteUrl + resolveLink(doc)}</h5>
			</div>
		</div>
	)
}

export default SocialPreview