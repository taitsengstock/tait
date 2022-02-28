const fs = require('fs')
const path = require('path')

// This is now handled via a plugin, leaving here for reference
// 
// exports.onCreateWebpackConfig = ({ actions }) => {
// 	actions.setWebpackConfig({
// 		resolve: {
// 			alias: {
// 				'~components': path.resolve(__dirname, './src/components'),
// 				'~styles': path.resolve(__dirname, './src/styles'),
// 				'~assets': path.resolve(__dirname, './src/assets'),
// 				'~utils': path.resolve(__dirname, './src/utils'),
// 				'~context': path.resolve(__dirname, './src/context'),
// 			},
// 		},
// 	})
// }

exports.createPages = async ({graphql, actions}) => {
	const { createPage } = actions

	// Pages
	const pagesQuery = await graphql(`
    {
      allSanityPage {
        nodes {
          _updatedAt(formatString: "YYYY-MM-DD")
          slug {
            current
          }
        }
      }
      allSanityProduct {
        nodes {
          _updatedAt(formatString: "YYYY-MM-DD")
          slug {
            current
          }
        }
      }
    }
  `)

	const pages = pagesQuery.data.allSanityPage.nodes || []

	pages.forEach(node => {
		const path = `/${node.slug.current}/`
		createPage({
			path,
			component: require.resolve('./src/templates/Page'),
			context: {
				slug: node.slug.current,
				lastMod: node._updatedAt
			},
		})
	})

	const products = pagesQuery.data.allSanityProduct.nodes || []

	products.forEach(node => {
		const path = `products/${node.slug.current}/`
		createPage({
			path,
			component: require.resolve('./src/templates/Product'),
			context: {
				slug: node.slug.current,
				lastMod: node._updatedAt
			},
		})
	})

}

exports.onPostBuild = ({ graphql }) => {
	graphql(`
    {
      redirects: allSanityRedirect {
        nodes {
          rule
          target
          statusCode
        }
      }
    }
  `).then(({ data }) => {
		const redirectData = data.redirects.nodes
			.map(
				({ rule, target, statusCode }) =>
					`${rule} ${target} ${statusCode}`
			)
			.join('\n')

		fs.writeFileSync(
			path.resolve(__dirname, 'public/_redirects'),
			redirectData
		)
	})
}
  