import { previewWebhook } from './constants'

const refreshPreview = () => {
	const refreshURL = window.location.hostname === 'localhost' ? 
		'http://localhost:8000/__refresh' :
		previewWebhook
	fetch(refreshURL, {
		method: 'POST',
	}).then(() => console.log('✨ Refreshed Preview'))
}

export default refreshPreview