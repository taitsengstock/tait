import React from 'react'
import PropTypes from 'prop-types'
import { css } from '@emotion/react'
import styled from '@emotion/styled'
import { graphql } from 'gatsby'
import Seo from '~components/Seo'
import DataViewer from '~utils/DataViewer'
import useSiteSettings from '~utils/useSiteSettings'
import Section from '~components/Section'

const IndexPage = ({ data }) => {
	const { page } = data

	return (
		<>	
			<Seo 
				title={page.title}
				metaTitle={page.seo?.metaTitle}
				description={page.seo?.metaDescription}
				image={page.seo?.socialImage}
			/>
			<Section>
				<Heading>Hullo World 🩴</Heading>
			</Section>
			<DataViewer data={page} name="page"/>
		</>
	)
}

const Heading = styled.h1`
	margin: var(--xl) 0;
	grid-column: span 12;
`

export const query = graphql`
  query HomeQuery {
    page: sanityHomePage {
      title
			seo{
				...seo
			}
    }
  }
`

IndexPage.propTypes = {
	data: PropTypes.object,
}

export default IndexPage
