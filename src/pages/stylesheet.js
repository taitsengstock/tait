import React from 'react'
import { css } from '@emotion/react' 

const Stylesheet = () => {
	return(
		<div css={css`padding: 3rem;`}>
			<h1>Heading 1</h1>
			<h2>Heading 2</h2>
			<h3>Heading 3</h3>
			<h4>Heading 4</h4>
			<h5>Heading 5</h5>
			<h6>Heading 6</h6>

			<p>
        Lorem ipsum dolor sit amet, consectetur adipiscing elit. Aliquam imperdiet purus id libero pulvinar, eu vehicula enim porta. Vivamus et massa euismod, ornare neque porttitor, dignissim lorem. Aenean sodales, arcu et scelerisque ornare, nisi velit faucibus nisl, ac interdum turpis nunc cursus nibh. Quisque eleifend consectetur lectus, a fringilla orci ultricies et.
			</p>
			<p>
        Maecenas porta massa in dapibus cursus. Donec id sem vulputate, tincidunt erat at, sollicitudin purus. Suspendisse euismod, lacus eu consectetur vulputate, magna nisl euismod ipsum, quis rutrum justo ex ut diam. Maecenas quis nisi a est volutpat rhoncus. Proin et enim at nibh semper egestas.
			</p>
		</div>
	)
}

export default Stylesheet