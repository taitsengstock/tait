import React from 'react'
import { css } from '@emotion/react'
import Seo from '~components/Seo'
import Section from '~components/Section'

const Error404 = () => {
	return (
		<>
			<Seo
				title="404"
			/>
			<Section>
				<div css={css`
          grid-column: span 12;
          margin: 60px 0;
          h2{
            margin-bottom: 6px;
          }
        `}>
					<h2>404</h2>
					<p>Page not found</p>
				</div>
			</Section>
		</>
	)
}

export default Error404
