# 🟣 Dot Gatsby

A bare-bones starter for getting up and running with a Gatsby front-end and a Sanity back-end.

## Setting up a new project (in 32 easy steps) 🏌🏻‍♂️

1. Click the green "Use this template" button above, and set up the new project repo. It should be private.
2. Click Code > Open with Github Desktop

### Sanity

3. Open the studio folder in terminal and run `sanity install && sanity init`
4. Once this is done it will ask if you'd like to reconfigure the sanity studio, respond yes, then create a new project. Use default dataset configuration.
5. Run `sanity dataset import production.tar.gz production` this copies a dump of the default dataset in to our new Sanity project.
6. Run `sanity start` and you should now see a fresh studio pop up with some basic initial content 🌱.
7. Run `sanity graphql deploy` to deploy your grapghql schema.
8. Open your sanity.json file and change project name to the name of your project.
9. Run `sanity deploy` to deploy the hosted version of the studio that the client will use.

### Gatsby

10. Open the root folder in terminal and run `yarn`. This installs the project dependencies.
11. Copy .env.example to create a new .env file. From within the studio folder run `sanity manage`. This will bring up the Sanity project dashboard.
12. Add the project id and dataset to your .env file
13. Go to Settings > Tokens and create a new token called Gatsby with Editor permissions. Add this token to your .env file. This allows watchMode and overlayDrafts in `gatsby-source-sanity`.
14. You should now be able to run `yarn start` from the root folder and the site will compile with content from your new studio 🎉.
15. Commit your changes to master.

### Shopify (needs to be updated)

16. Log in to [Shopify Partners](https://partners.shopify.com/1421112/stores) and click Add store.
17. Create a new development store and enter all relevant details.
18. Once you're in your new store go to Apps > Manage Private Apps and Enable private app development.
19. Create a private app. The App name should be Sanity and it should have Read & Write access to customers and products.
20. Tick the checkbox to enable the Storefront API and allow all permissions. Hit save and you'll receieve your API credentials.
21. Add the relevant credentials to your .env file, in order to locate the `GATSBY_SHOPIFY_SECRET` you'll need to go to Settings > Notifications > Create Webhook and create the webhooks in the following step, it will then show you the token.
22. Add a webhook to shopify for Product Creation, Product Deletion, Product Update. The url should be https://**mysite**.gtsb.io/api/shopify-sync

### Gatsby Cloud

23. Open our [Gatsby Cloud account](https://www.gatsbyjs.com/dashboard/organization/ae3626ec-36f4-4aac-94db-220e874f4ad3/sites) and select 'Add Site'.
24. Choose the respository and import
25. Click 'Bulk Add Variables' and paste in your .env file to both the Build Variables tab and the Preview Variables tab. You'll need to remove the comments afte you paste it in for Gatsby Cloud to accept it.
26. Manually add one more variable to the preview tab only called GATSBY_PREVIEW and set it to true.
27. Hit Build Site. It may initially fail, but should restart with the updated .env files.
28. In the site Settings tab, go to Data Sources and connect Sanity.

### Final settings

29. Open up `src/utils/constants.js` in your code editor and paste in the previewUrl. Set the siteUrl to the Gatsby Cloud Builds url (eg. https://**mysite**.gtsb.io). Then fill out the remaining details.
30. To find the Preview Webhook, in Gatsby Cloud go to Site Settings > Webhook and scroll down until you see 'Preview Webhook'.
31. You should now be able to see both the Preview and Live tabs working locally in your local Sanity studio. Run `sanity deploy` then check that it is also working in the deployed studio.
32. Go in to your Sanity Studio and remove any dummy content you don't need.

You did it 🥲

## VS Code Snippets 💆‍♀️

Below is a list of all available snippets and the triggers of each one. The **→** means the `TAB` key.

| Trigger                       | Content                                                                                                          |
| ----------------------------- | ---------------------------------------------------------------------------------------------------------------- |
| `bc→`                         | basic functional component                                                                                       |
| `bcs→`                        | functional component with state                                                                                  |
| `bce→`                        | functional component with useEffect                                                                              |
| `bcse→`                       | functional component with state & useEffect                                                                      |
| `ue→`                         | useEffect skeleton                                                                                               |
| `us→`                         | useState skeleton (<i>hint: After typing the state name press tab again to autoselect the setState section.</i>) |
| `ur→`                         | useRef skeleton                                                                                                  |
| `ic→`                         | import Component                                                                                                 |
| `iu→`                         | import Utility                                                                                                   |
| `im→`                         | import a module                                                                                                  |
| `imn→`                        | import a named export from a module                                                                              |
| `cl→`                         | console.log                                                                                                      |
| `mob→`                        | mobile                                                                                                           |
| `tab→`                        | tablet                                                                                                           |
| `var→`                        | var(--)                                                                                                          |
| `st→`                         | styled definition                                                                                                |
| `stc→`                        | styled component definition                                                                                      |
| `pta→`                        | `PropTypes.array,`                                                                                               |
| `ptar→`                       | `PropTypes.array.isRequired,`                                                                                    |
| `ptb→`                        | `PropTypes.bool,`                                                                                                |
| `ptbr→`                       | `PropTypes.bool.isRequired,`                                                                                     |
| `ptf→`                        | `PropTypes.func,`                                                                                                |
| `ptfr→`                       | `PropTypes.func.isRequired,`                                                                                     |
| `ptn→`                        | `PropTypes.number,`                                                                                              |
| `ptnr→`                       | `PropTypes.number.isRequired,`                                                                                   |
| `pto→`                        | `PropTypes.object,`                                                                                              |
| `ptor→`                       | `PropTypes.object.isRequired,`                                                                                   |
| `pts→`                        | `PropTypes.string,`                                                                                              |
| `ptsr→`                       | `PropTypes.string.isRequired,`                                                                                   |
| `ptsm→`                       | `PropTypes.symbol,`                                                                                              |
| `ptsmr→`                      | `PropTypes.symbol.isRequired,`                                                                                   |
| `ptan→`                       | `PropTypes.any,`                                                                                                 |
| `ptanr→`                      | `PropTypes.any.isRequired,`                                                                                      |
| `ptnd→`                       | `PropTypes.node,`                                                                                                |
| `ptndr→`                      | `PropTypes.node.isRequired,`                                                                                     |
| `ptel→`                       | `PropTypes.element,`                                                                                             |
| `ptelr→`                      | `PropTypes.element.isRequired,`                                                                                  |
| `pti→`                        | `PropTypes.instanceOf(ClassName),`                                                                               |
| `ptir→`                       | `PropTypes.instanceOf(ClassName).isRequired,`                                                                    |
| `pte→`                        | `PropTypes.oneOf(['News', 'Photos']),`                                                                           |
| `pter→`                       | `PropTypes.oneOf(['News', 'Photos']).isRequired,`                                                                |
| `ptet→`                       | `PropTypes.oneOfType([PropTypes.string, PropTypes.number]),`                                                     |
| `ptetr→`                      | `PropTypes.oneOfType([PropTypes.string, PropTypes.number]).isRequired,`                                          |
| `ptao→`                       | `PropTypes.arrayOf(PropTypes.number),`                                                                           |
| `ptaor→`                      | `PropTypes.arrayOf(PropTypes.number).isRequired,`                                                                |
| `ptoo→`                       | `PropTypes.objectOf(PropTypes.number),`                                                                          |
| `ptoor→`                      | `PropTypes.objectOf(PropTypes.number).isRequired,`                                                               |
| `ptoos→`                      | `PropTypes.objectOf(PropTypes.shape()),`                                                                         |
| `ptoosr→`                     | `PropTypes.objectOf(PropTypes.shape()).isRequired,`                                                              |
| `ptsh→`                       | `PropTypes.shape({color: PropTypes.string, fontSize: PropTypes.number}),`                                        |
| `ptshr→`                      | `PropTypes.shape({color: PropTypes.string, fontSize: PropTypes.number}).isRequired,`                             |
| `sd→`                         | Sanity document                                                                                                  |
| `so→`                         | Sanity Object                                                                                                    |
| `sot→`                        | Sanity Object with Tabs                                                                                          |
| `sf→`                         | Sanity Field                                                                                                     |
| `sff→`                        | Sanity Field with Fieldset                                                                                       |
| `sa→`                         | Sanity Array Field                                                                                               |
| `sr→`                         | Sanity Reference Field                                                                                           |
| `de→`                         | Sanity Description                                                                                               |
| `imageSize→`                  | Image size description                                                                                           |
| `imageWidth→`                 | Image width description                                                                                          |
| `sanityPreviewSelect→`        | Basic preview object                                                                                             |
| `sanitySelect→`               | Basic select object for preview                                                                                  |
| `sanityPrepare→`              | Prepare function for preview                                                                                     |
| `sanityPreviewSelectPrepare→` | Preview with selection object and prepare function                                                               |
| `sanityRequired→`             | Add required validation                                                                                          |
