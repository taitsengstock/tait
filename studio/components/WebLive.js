/* eslint-disable react/prop-types */
import React, { useState, useEffect } from 'react'
import resolveLink from '../../src/utils/resolveLink'
import sanityClient from 'part:@sanity/base/client'
// import refreshPreview from "../../src/utils/refreshPreview"
import { siteUrl } from '../../src/utils/constants'

const WebPreview = ({ document, live }) => {


	const { displayed } = document
	const [loaded, setLoaded] = useState(false)
	const [loads, setLoads] = useState(1)

	const url = siteUrl + resolveLink(displayed) + '/'

	useEffect(() => {
		setLoaded(false)
	}, [loads])

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
							<a href={url} target="_blank" style={{color: 'inherit'}} rel="noreferrer">Click here</a> to open page in new tab. 
							<button onClick={() => setLoads(loads + 1)} style={{
								marginLeft: '1em',
								border: '1px solid rgba(93, 113, 145, 0.4)',
								background: 'white',
								fontFamily: 'inherit',
								borderRadius: '3px',
								color: 'inherit',
								fontSize: 'inherit',
								lineHeight: 'inherit',
								cursor: 'pointer',
							}}>Reload frame</button>
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
				src={url + `?loads=${loads}`}
				frameBorder={0}
				onLoad={() => setLoaded(true)}
			/>
		</>
	)
}

export default WebPreview