import React from 'react'

const Select = (props) => {

	const {data, className, ...restOfProps} = props

	const classNames = `form-control ${ className ? className : '' }`

	return (
		<select className={classNames} {...restOfProps}>
			{data.map((item) => (
				<option key={item} value={item}>{item}</option>
			))}
		</select>
	)
}

export default Select