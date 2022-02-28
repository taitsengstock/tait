/* eslint-disable react/prop-types */
import React, { useState } from 'react'
import resolveLink from '../../src/utils/resolveLink'
// import refreshPreview from "../../src/utils/refreshPreview"
import { previewUrl } from '../../src/utils/constants'

const WebPreview = ({ document }) => {

	const localURL = 'http://localhost:8000'
	const resolvedURL = window.location.hostname === 'localhost' ? localURL : previewUrl
  
	const { displayed } = document
	const url = resolvedURL + resolveLink(displayed)
	const [loaded, setLoaded] = useState(false)


	// refresh on preview load
	// useEffect(() => {
	//   refreshPreview()
	// }, [])


	return (
		<>
			<div style={{
				padding: '6px 30px',
				background: '#FFFFFF',
				textAlign: 'center',
				fontSize: '13px',
				borderBottom: '1px solid rgba(93, 113, 145, 0.4)',
			}}>
				<p style={{margin: '0'}}>
					{loaded &&
						<span>
							<a href={url} target="_blank" style={{color: 'inherit'}} rel="noreferrer">Click here</a> to open preview in new tab
						</span>
					}
					{!loaded &&
						<span>
							Loading...
						</span>
					}
				</p>
			</div>
			<iframe
				style={{width: '100%', height: '100%'}}
				src={url}
				frameBorder={0}
				onLoad={() => setLoaded(true)}
			/>
		</>
	)
}

export default WebPreview