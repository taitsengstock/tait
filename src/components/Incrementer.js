import React, { useEffect, useState } from 'react'
import PropTypes from 'prop-types'
import styled from '@emotion/styled'
import { css } from '@emotion/react'

const Incrementer = ({ className, onChange, initialValue, maxValue }) => {
  
	const [value, setValue] = useState(0)

	useEffect(() => {
		setValue(initialValue ?? 1)
	}, [initialValue])

	const updateValue = newValue => {
		if(newValue > 0 && (!maxValue || newValue <= maxValue)){
			setValue(newValue)
			if(onChange){
				onChange(newValue)
			}
		}
		return
	}

	return (
		<Wrap className={className}>
			<Inc 
				onClick={() => updateValue(value - 1)}
				css={css`left: 0px;`}
			>-</Inc>
			<Input 
				type="text" 
				readOnly={true} 
				value={value}
			/>
			<Inc 
				onClick={() => updateValue(value + 1)}
				css={css`right: 0px;`}
			>+</Inc>
		</Wrap>
	)
}

const Wrap = styled.div`
  position: relative;
  width: 88px;
  height: 40px;
`

const Input = styled.input`
  -moz-appearnace: none;
  -webkit-appearance: none;
  border: none;
  height: 100%;
  text-align: center;
  display: block;
  width: 100%;
  box-sizing: border-box;
  border: 1px solid var(--black);
  font-family: inherit;
`

const Inc = styled.button`
  padding: 12px;
  position: absolute;
  top: 50%;
  transform: translateY(-50%);
`
Incrementer.propTypes = {
	className: PropTypes.string,
	onChange: PropTypes.func, 
	initialValue: PropTypes.number, 
	maxValue: PropTypes.number,
}

export default Incrementer
