import React, { useEffect, useState } from 'react'
import { css } from '@emotion/react'
import ReactJson from 'react-json-view-ssr'
import ReactDOM from 'react-dom'

const DataViewer = ({ data, name }) => {
	const isDev = process.env.NODE_ENV === 'development' && !process.env.GATSBY_PREVIEW
	const [visible, setVisible] = useState(false)

	useEffect(() => {
		if(isDev){
			document.addEventListener('keydown', e => {
				if(e.code === 'KeyD'){
					setVisible(prevVis => !prevVis)
				}
			})
		}
	}, [isDev])

	if(!isDev) return null
	return  ReactDOM.createPortal(
		<div css={css`
            position: fixed;
            top: 0;
            bottom: 0;
            left: 0;
            right: 0;
            opacity: 0.95;
            background: rgb(43, 48, 59);
            display: ${visible ? 'block' : 'none'};
            overflow-y: scroll;
            font-size: 15px;
            line-height: 1.3;
            z-index: 999;
          `}>
			<ReactJson 
				src={data} 
				name={name} 
				indentWidth={2} 
				collapsed={true} 
				theme='ocean' 
				style={{padding: '20px'}} 
				enableClipboard={false} 
			/>
		</div>, document.body)
}

export default DataViewer