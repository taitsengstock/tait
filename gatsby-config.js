require('dotenv').config()
const moment = require('moment')
const { GATSBY_SANITY_PROJECT_ID, GATSBY_SANITY_API_TOKEN, GATSBY_SANITY_DATASET } = process.env
const isProd = process.env.NODE_ENV === 'production'
const { siteUrl, gTag } = require('./src/utils/constants.js')

module.exports = {
	siteMetadata: {
		title: 'Starter',
		siteUrl: siteUrl,
	},
	plugins: [
		{
			resolve: 'gatsby-source-sanity',
			options: {
				projectId: GATSBY_SANITY_PROJECT_ID,
				dataset: GATSBY_SANITY_DATASET,
				token: GATSBY_SANITY_API_TOKEN,
				watchMode: !isProd,
				overlayDrafts: !isProd,
			},
		},   
		'gatsby-plugin-emotion',
		'gatsby-plugin-image',
		'gatsby-plugin-use-query-params',
		'gatsby-plugin-netlify',
		{
			resolve: 'gatsby-plugin-google-gtag',
			options: {
				// You can add multiple tracking ids and a pageview event will be fired for all of them.
				trackingIds: [
					gTag, // Google Analytics / GA
					// "AW-CONVERSION_ID", // Google Ads / Adwords / AW
					// "DC-FLOODIGHT_ID", // Marketing Platform advertising products (Display & Video 360, Search Ads 360, and Campaign Manager)
				],
			},
		},
		'gatsby-plugin-react-helmet',
		{
			resolve: 'gatsby-plugin-sitemap',
			options: {
				output: '/sitemap.xml',
				exclude: ['/stylesheet', '/bag', '/404', '/account'],
				query: `
          {
            site {
              siteMetadata {
                siteUrl
              }
            }

            allSitePage {
              nodes {
                path
                pageContext
              }
            }
          }
        `,
				serialize: ({ allSitePage, site }) => {
					const checkPriority = path => {
						let slashes = (path.match(/\//g)).length

						if(slashes === 1){
							return 1
						} else if (slashes === 2) {
							if (['about', 'journal'].some(v => path.includes(v))) {
								return 0.8
							} else {
								return 0.7
							}
						} else {
							return 0.5
						}
					}
          
					let pages = allSitePage.nodes.map(node => {
						return {
							url: site.siteMetadata.siteUrl + node.path,
							changefreq: 'daily',
							priority: checkPriority(node.path),
							lastmod: node.pageContext.lastMod ?? moment().format('YYYY-MM-DD')
						}
					})

					pages.sort(function compare(a, b) {
						if (a.priority > b.priority) {
							return -1
						}
						if (a.priority < b.priority) {
							return 1
						}
						return 0
					})
            
					return pages
            
				},
			},
		},
		{
			resolve: 'gatsby-plugin-manifest',
			options: {
				icon: 'static/images/favicon.png',
			},
		},
		'gatsby-plugin-sharp',
		'gatsby-transformer-sharp',
		{
			resolve: 'gatsby-plugin-layout',
			options: {
				component: require.resolve('./src/components/Layout.js'),
			},
		},
		{
			resolve: 'gatsby-plugin-alias-imports',
			options: {
				alias: {
					'~src': 'src',
					'~components': 'src/components',
					'~styles': 'src/styles',
					'~assets': 'src/assets',
					'~utils': 'src/utils',
					'~context': 'src/context',
				},
				extensions: [
					'js',
				],
			}
		}
	],
}
