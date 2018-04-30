import React from 'react'
import InputGroup from '../elements/InputGroup'
import Input from '../elements/Input'
import Select from '../elements/Select'

const CoinInput = (props) => {

	const { inputName, inputValue, inputClass, selectName, selectValue, selectData, onChange, className, ...restOfProps } = props

	const classNames = `row no-gutters w-100 ${className ? className : ''}`

	return (
		<div className={classNames}>
			<InputGroup labelText='Amount' className='mr-2'>
				<Input name={inputName} value={inputValue} onChange={onChange} type='number' className='text-center' {...restOfProps} />
			</InputGroup>
			<InputGroup labelText='Coin' className=''>
				<Select data={selectData} name={selectName} value={selectValue} onChange={onChange}/>
			</InputGroup>
		</div>
		)
}

export default CoinInput
