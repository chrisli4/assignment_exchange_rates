import React from 'react'

import { Section, InputGroup, Table, Select } from '../elements/'
import { CoinInput, LineGraph } from './'

const App = (props) => {
	
	const { tableHeader, coinList, amount, base, rates, handleRates, fAmount, fBase, tAmount, tBase, 
	handleConvert, handlePeriod, timeList, timePeriod, startTime, endTime, coinA, coinB, handleGraph, trendA, trendB } = props

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
						<InputGroup name='coinA' labelText='Coin A'>
							<Select 
								name='coinA'
								data={coinList} 
								value={coinA} 
								onChange={handleGraph} 
							/>
						</InputGroup>
						<InputGroup name='coinB' labelText='Coin B'>
							<Select 
								name='coinB'
								data={coinList} 
								value={coinB} 
								onChange={handleGraph} 
							/>
						</InputGroup>
						<InputGroup labelText='Time Period'>
							<Select 
								name='timePeriod'
								data={timeList}  
								value={timePeriod} 
								onChange={handlePeriod}
							/>
						</InputGroup>
					</div>
					<div className='row'>
						<LineGraph 
							coinA={coinA}
							coinB={coinB}
							trendA={trendA} 
							trendB={trendB}
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
						selectData={coinList} 
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
						selectData={coinList} 
						onChange={handleConvert}
					/>
					<CoinInput
						inputName='tAmount' 
						inputValue={tAmount}
						selectName='tBase'
						selectValue={tBase} 
						selectData={coinList} 
						onChange={handleConvert}
						readOnly
					/>
				</Section>

			</div>
			</div>
		)
}

export default App