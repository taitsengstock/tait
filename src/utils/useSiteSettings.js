import { graphql, useStaticQuery } from 'gatsby'

const useSiteSettings = () => {

	const siteSettings = useStaticQuery(graphql`
    query {
      sanitySiteSettings {
        siteSocialImage: socialImage {
          asset {
            _id
          }
        }
        siteMetaDescription: metaDescription
        siteTitle
      }
    }
    `)

	return siteSettings?.sanitySiteSettings
}

export default useSiteSettings
