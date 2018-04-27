import React from 'react'

import { Section, InputGroup, Input, Table, Select } from '../elements/'
import { CoinInput, LineGraph } from './'

const App = (props) => {
	
	const { tableHeader, coins, amount, base, rates, handleRates, fAmount, fBase, tAmount, tBase, 
			handleConvert, startTime, endTime, tCoin, handleGraph, trend } = props

	return (
		<div className="App container">

			{/* title section */}
			<div className='text-center py-3 my-4'>
				<h2>CryptoConverter</h2>
				<small className="text-muted">A simple webapp to track cryptocurrency trends.</small>
			</div>

			{/* Row - Historical Trends */}
			<div className='row'>
				<Section title='Historical Trends'>
					<div className='row'>
						<InputGroup name='startTime' labelText='Start Date'>
							<Input 
								name='startTime'
								type='date' 
								value={startTime} 
								onChange={handleGraph}  
							/>
						</InputGroup>
						<InputGroup name='endTime' labelText='End Date'>
							<Input 
								name='endTime'
								type='date' 
								value={endTime} 
								onChange={handleGraph} 
							/>
						</InputGroup>
						<InputGroup name='tCoin' labelText='Coin'>
							<Select 
								name='tCoin'
								data={coins} 
								value={tCoin} 
								onChange={handleGraph} 
							/>
						</InputGroup>
					</div>

					<div className='row'>
						<LineGraph 
							data={trend} 
							startTime={startTime} 
							endTime={endTime} 
						/>
					</div>
				</Section>	
			</div>

			{/* Row for next two sections */}
			<div className='row'>

				{/* Column - Latest Exchange Rates */}
				<Section title='Latest Exchange Rates'>
					<CoinInput
						inputName='amount' 
						inputValue={amount}
						selectName='base'
						selectValue={base} 
						selectData={coins} 
						onChange={handleRates}
					/>
					<Table 
						header={tableHeader} 
						data={rates} 
						className='text-center'
					/>
				</Section>

				{/* Column - Cryptocurrency Converter */}
				<Section title='Cryptocurrency Converter'>
					<CoinInput
						inputName='fAmount' 
						inputValue={fAmount}
						selectName='fBase'
						selectValue={fBase} 
						selectData={coins} 
						onChange={handleConvert}
					/>
					<CoinInput
						inputName='tAmount' 
						inputValue={tAmount}
						selectName='tBase'
						selectValue={tBase} 
						selectData={coins} 
						onChange={handleConvert}
						readOnly
					/>
				</Section>
				
			</div>
		</div>
		)
}

export default App