import {
	netlifySiteName,
	netlifyAppId,
	netlifyBuildHookId
} from '../src/utils/constants'

export default {
	widgets: [
		// {
		//   name: 'published-document-list',
		//   options: {
		//     title: 'Recently published',
		//     order: '_updatedAt desc',
		//     query: '*[!(_type in ["siteSettings"]) && !(_id match "drafts*") && !(_type match "system*") && !(_type match "sanity*")]',
		//   }
		// },
		{
			name: 'netlify',
			layout: {
				width: 'small',
				height: 'small'
			},
			options: {
				title: 'Netlify Deploys',
				sites: [
					{
						title: 'Live Website',
						apiId: netlifyAppId,
						buildHookId: netlifyBuildHookId,
						name: netlifySiteName,
						// url: siteUrl,
					}
				]
			}
		}
	]
}