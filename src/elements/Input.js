import React from 'react'

const Input = (props) => {

	const { className, ...restOfProps } = props
	const classNames = `form-control ${className}`

	return (
		<input className={classNames} {...restOfProps} />
	)
}

export default Input