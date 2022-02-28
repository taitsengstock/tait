import React from 'react'
import PropTypes from 'prop-types'
import { graphql } from 'gatsby'
import { css } from '@emotion/react'
import styled from '@emotion/styled'
import RichText from '~components/RichText'
import Image from '~components/Image'
import Seo from '~components/Seo'
import Section from '~components/Section'
import DataViewer from '~utils/DataViewer'
import SanityLink from '~components/SanityLink'

const Page = ({ data }) => {
	const { page } = data
	return(
		<>
			<Seo 
				title={page.title}
				metaTitle={page.seo?.metaTitle}
				description={page.seo?.metaDescription}
				image={page.seo?.socialImage}
			/>
			<Section>
				<Heading>{page.title}</Heading>
				<Text>
					<RichText content={page.text}/>
				</Text>
			</Section>
			<DataViewer data={page} name="content"/>
		</>
	)
}

Page.propTypes = {
	data: PropTypes.object,
}

const Heading = styled.h1`
	margin: var(--xl) 0;
	grid-column: span 12;
`

const Text = styled.div`
	grid-column: span 12;
`

export const query = graphql`
  query PageQuery($slug: String) {
    page: sanityPage(slug: {current: {eq: $slug}}) {
      title
      text: _rawText(resolveReferences: {maxDepth: 4})
			seo{
				...seo
			}
    }
  }
`

export default Page