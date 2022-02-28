
import { graphql } from 'gatsby'

export const seo = graphql`
  fragment seo on SanitySeo {
    metaTitle
    metaDescription
    socialImage {
      asset {
        _id
      }
    }
  }
`

export const imageWithCaption = graphql`
	fragment imageWithCaption on SanityImageWithCaption {
		asset {
			_id
		}
		crop {
			bottom
			right
			left
			top
		}
		hotspot {
			height
			width
			x
			y
		}
		alt
		caption: _rawCaption(resolveReferences: {maxDepth: 3})
	}
`

export const imageWithAlt = graphql`
	fragment imageWithAlt on SanityImageWithAlt {
		asset {
			_id
		}
		crop {
			bottom
			right
			left
			top
		}
		hotspot {
			height
			width
			x
			y
		}
		alt
	}
`

export const link = graphql`
	fragment link on SanityLink {
		linkType
		url
		blank
		document {
			... on SanityPage {
				_type
				slug {
					current
				}
			}
			... on SanityProduct {
				_type
				slug {
					current
				}
			}
			... on SanityVariant {
				_type
				content {
					shopify {
						productSlug
					}
				}
			}
		}
	}
`