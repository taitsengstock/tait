import { useLayoutEffect, useState } from 'react'
import { browserName, isTablet, isMobile } from 'react-device-detect'

const useSafari = () => {
	const [safari, setSafari] = useState(true)

	useLayoutEffect(() => {
		if(browserName !== 'Safari' && browserName !== 'Mobile Safari' && !isTablet && !isMobile){
			setSafari(false)
		}
	}, [browserName])

	return safari
}

export default useSafari