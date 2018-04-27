import React from 'react'

const Section = (props) => {

	const { divClass, titleClass, title, children } = props
	const divClasses = `container col my-3 py-2 ${ divClass ? divClass : ''}`
	const titleClasses = `text-center ${ titleClass ? titleClass : ''}`

	return (
		<div className={divClasses}>
			<div className='pb-2 mb-4'>
				<h3 className={titleClasses}>{title}</h3>
			</div>
			{children}
		</div>
	)
}

export default Section