import React from 'react'

const InputGroup = (props) => {

	const { name, labelText, children, className} = props
	const classNames = `form-group col ${className ? className : ''}`

	return (
		<div className={classNames}>
			<label htmlFor={name}>{labelText}</label>
			{children}
		</div>
	)

}

export default InputGroup