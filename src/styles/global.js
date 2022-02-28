import React from 'react'
import { Global, css } from '@emotion/react'

export const breakpoints =  {
	mobile: '@media (max-width: 768px)',
	tablet: '@media (max-width: 1024px)',
	desktop: '@media (max-width: 1230px)',
	desktopUp: '@media (min-width: 1025px)'
}

export const mobile = breakpoints.mobile
export const tablet = breakpoints.tablet
export const desktop = breakpoints.desktop
export const desktopUp = breakpoints.desktopUp


const GlobalStyles = () => (
	<>
		<Global styles={reset} />
		<Global styles={styles} />
	</>
)

const styles = css`
  body {
    font-family: 'Bourrasque', sans-serif;
  }

  :root{
    --white: #ffffff;
    --black: #000000;
    --xxs: 5px;
    --xs: 10px;
    --s: 20px;
    --m: 30px;
    --l: 40px;
    --xl: 50px;
    --xxl: 80px;
    --xxxl: 100px;
    --xxxxl: 150px;
  }

  ${tablet}{
    :root{
      --xxs: 3px;
      --xs: 7px;
      --s: 15px;
      --m: 20px;
      --l: 30px;
      --xl: 35px;
      --xxl: 40px;
      --xxxl: 60px;
      --xxxxl: 120px;
    }
  }

  p{
    margin-bottom: 0.5em;
    &:last-child{
      margin-bottom: 0;
    }
  }

  h1,
  .h1 {
    font-size: 80px;
    line-height: 80px;
    ${tablet} {
      font-size: 40px;
      line-height: 40px;
    }
  }

`
const reset = css`

  body {
    margin: 0px;
    min-height: 100%;
  }

  h1,
  h2,
  h3,
  h4,
  h5,
  h6 {
    font-weight: inherit;
    font-size: inherit;
  }

  p,
  h1,
  h2,
  h3,
  h4,
  h5,
  h6 {
    margin: 0;
    padding: 0;
  }

  ul, ol, blockquote {
    margin: 0;
    padding: 0;
  }

  li {
    margin: 0.5em 0;
  }

  a {
    color: inherit;
    text-decoration: none;
  }

  * {
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
    -webkit-tap-highlight-color:  rgba(255, 255, 255, 0);
		/*  This prevents chrome from annoyingly adjusting the scroll to try and compensate for moving elements */
		overflow-anchor: none;
  }

  button{
    -webkit-appearance: none;
    border: none;
    background: none;
    font-size: inherit;
    font-family: inherit;
    cursor: pointer;
    padding: 0;
    margin: 0;
  }

  input:-webkit-autofill,
	input:-webkit-autofill:hover, 
	input:-webkit-autofill:focus,
	textarea:-webkit-autofill,
	textarea:-webkit-autofill:hover,
	textarea:-webkit-autofill:focus,
	select:-webkit-autofill,
	select:-webkit-autofill:hover,
	select:-webkit-autofill:focus {
		border: none;
		-webkit-text-fill-color: inherit;
		-webkit-box-shadow: 0 0 0px 0px transparent inset;
		transition: background-color 5000000s ease-in-out 0s;
	}
`

export default GlobalStyles
