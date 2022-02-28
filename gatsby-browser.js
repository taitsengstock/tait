import React from 'react'

import { SiteStore } from '~context/siteContext'
import refreshPreview from '~utils/refreshPreview'

const isDev = process.env.NODE_ENV === 'development'

export const wrapRootElement = ({ element }) => (
	<SiteStore>{element}</SiteStore>
)

const transitionDelay = 700
export const shouldUpdateScroll = ({
	routerProps: { location },
	getSavedScrollPosition,
}) => {
	if(location.state?.disableScrollUpdate === true){
		const { disableScrollUpdate } = location.state
		return !disableScrollUpdate
	}
	window.history.scrollRestoration = 'manual'
	const currentPosition = getSavedScrollPosition(location)
	window.setTimeout(() => {
		window.scrollTo(...currentPosition)
	}, transitionDelay )
	return false
}


export const onClientEntry = () => {
	// refresh the preview on hard reload
	if(isDev){
		refreshPreview()
	}

	// stop safari from loaded cached page state on back button
	(function () {
		window.onpageshow = function(event) {
			if (event.persisted) {
				window.location.reload()
			}
		}
	})()

}
