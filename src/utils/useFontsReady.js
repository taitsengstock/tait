import { useState, useEffect } from 'react'

const useFontsReady = () => {
	const [ready, setReady] = useState(false)

	useEffect(() => {
		document.fonts.ready.then(() => setReady(true))
	}, [])

	return ready
}

export default useFontsReady