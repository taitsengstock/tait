import S from '@sanity/desk-tool/structure-builder'
import SocialPreview from './components/SocialPreview'
import WebPreview from './components/WebPreview'
import WebLive from './components/WebLive'
import JsonPreview from './components/JsonPreview'
import refreshPreview from '../src/utils/refreshPreview'

import {
	IoShirtSharp,
	IoDocument,
	IoSwapHorizontalOutline,
	IoSettingsSharp,
} from 'react-icons/io5'

export const getDefaultDocumentNode = ({ schemaType }) => {
	if (['page', 'homePage'].includes(schemaType)){

		let views = [
			S.view.form(),
			S.view.component(WebPreview).title('Preview'),
			S.view.component(WebLive).title('Live'),
			S.view.component(SocialPreview).title('Social Card'),
		]

		// Add JSON to views in localhost
		if(window.location.hostname === 'localhost'){
			views = [
				...views,
				S.view.component(JsonPreview).title('JSON')
			]
		}

		return S.document().views(views)
	} else {
		// Still show json tab even if we're not showing preview
		if(window.location.hostname === 'localhost'){
			return S.document().views([
				S.view.form(),
				S.view.component(JsonPreview).title('JSON')
			])
		}
	}
}

// Refresh on Studio load
refreshPreview()

export default () =>
	S.list()
		.title('Content')
		.items([
			S.listItem()
				.title('Products')
				.icon(IoShirtSharp)
				.child(
					S.documentTypeList('product')
						.title('Products')
				),
			S.listItem()
				.title('Pages')
				.icon(IoDocument)
				.child(
					S.documentList()
						.title('Pages')
						.filter('_type in ["page", "homePage"]')
				),
			S.divider(),
			S.listItem()
				.title('Settings')
				.icon(IoSettingsSharp)
				.child(
					S.list()
						.title('Settings')
						.items([
							S.listItem()
								.title('Site Settings')
								.icon(IoSettingsSharp)
								.child(
									S.editor()
										.schemaType('siteSettings')
										.documentId('siteSettings')
								),
							S.listItem()
								.title('Redirects')
								.icon(IoSwapHorizontalOutline)
								.child(
									S.documentTypeList('redirect')
										.title('Redirects')
								),
						])),
		])
