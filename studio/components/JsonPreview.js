/* eslint-disable react/prop-types */
import React from 'react'
import ReactJson from 'react-json-view'
const JsonPreview = ({ document }) => (
	// The JSON preview
	<ReactJson src={document.displayed} name={false} indentWidth={2} collapsed={false} style={{padding: '1rem'}} enableClipboard={false} />
	// <pre>{JSON.stringify(document.displayed, null, 4)}</pre>
)

export default JsonPreview