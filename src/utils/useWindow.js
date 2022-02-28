import { useState, useEffect } from 'react'

const useWindow = () => {
	const [currentWindow, setCurrentWindow] = useState({})

	useEffect(() => {
		function handleResize() {
			setCurrentWindow({...window})
		}
		handleResize()
		window.addEventListener('resize', handleResize)
		return () => window.removeEventListener('resize', handleResize)
	}, [])

	return currentWindow
}

export default useWindow