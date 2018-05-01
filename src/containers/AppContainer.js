import React, { Component } from 'react'

import App from '../components/App'
import { toArray, toVal, toDays, formatArr, toTimeUnit, unixToDate } from '../helpers/format'

class AppContainer extends Component {

	constructor() {
		super()
		this.state = {
			amount: 1,
			base: 'BTC',
			rates: [],

			fAmount: 1,
			fBase: 'BTC',
			tAmount: [],
			tBase: 'ETH',

			timePeriod: 'Week',
			startTime: '',
			endTime: '',
			coinA: 'BTC',
			coinB: 'ETH',
			trendA: [],
			trendB: [],

			isFetching: false,
			error: null,
		}
	}

	constants = {
		tableHeader: [{
			name: 'Currency',
			rate: 'Rate'
		}],
		currencyList: ['USD','JPY','EUR','AUD','CHF','NZD','CAD'],
		coinList: ['ADA','BCH','BTC','ETH','EOS','IOTA','NEO','LTC','OMG','VTC','XLM','XMR','XRB','XRP'],
		timeList: ['Day', 'Week', 'Month', 'Year'],
		proxy: 'https://tranquil-harbor-38042.herokuapp.com/'
	}

	componentDidMount() {
		this.processPromise('rates', this.state.amount, toArray, this.getRates(this.state.base, this.constants.currencyList.join(',')))
		this.processPromise('tAmount', this.state.fAmount, toVal, this.getRates(this.state.fBase, this.state.tBase))

		this.processPromises([this.getPrices(this.state.coinA, toDays(this.state.timePeriod), toTimeUnit(this.state.timePeriod)), 
							  this.getPrices(this.state.coinB, toDays(this.state.timePeriod), toTimeUnit(this.state.timePeriod))])
		
	}

	handleRates = (e) => {
		e.preventDefault()
		this.setState({
			[e.target.name]: e.target.value
		}, () => {
			this.processPromise('rates', this.state.amount, toArray, this.getRates(this.state.base, this.constants.currencyList.join(',')))
		})
	}

	handleConvert = (e) => {
		e.preventDefault()
		this.setState({
			[e.target.name]: e.target.value
		}, () => {
			this.processPromise('tAmount', this.state.fAmount, toVal, this.getRates(this.state.fBase, this.state.tBase))
		})
	}

	handlePeriod = (e) => {
		e.preventDefault()

		this.setState({
			[e.target.name]: e.target.value
		}, () => {

			this.processPromises([this.getPrices(this.state.coinA, toDays(this.state.timePeriod), toTimeUnit(this.state.timePeriod)), 
								  this.getPrices(this.state.coinB, toDays(this.state.timePeriod), toTimeUnit(this.state.timePeriod))])

		})
	}

	handleGraph = (e) => {
		e.preventDefault()
		this.setState({
			[e.target.name]: e.target.value
		}, () => {

			this.processPromises([this.getPrices(this.state.coinA, toDays(this.state.timePeriod), toTimeUnit(this.state.timePeriod)), 
								  this.getPrices(this.state.coinB, toDays(this.state.timePeriod), toTimeUnit(this.state.timePeriod))])

		})
	}

	processPromise = (target, amount, format, promise) => {
		Promise.resolve(promise)
		.then(res => {
			this.setState({
				isFetching: false,
				[target]: format(res, amount)
			})
		})
		.catch(e => {
			this.setState({
				isFetching: false,
				error: e
			})
		})
	}

	processPromises = (promiseArr) => {

		Promise.all(promiseArr)
			.then(arr => {
				this.setState({
					isFetching: false,
					trendA: formatArr(arr[0].Data),
					trendB: formatArr(arr[1].Data),

					startTime: unixToDate(arr[0].TimeFrom),
					endTime: unixToDate(arr[1].TimeTo)
				})
			})
			.catch(e => {
				this.setState({
					isFetching: false,
					error: e
				})
			})
	}

	getPrices = (coinName, timeNum, timeUnit) => {
		this.setState({
			isFetching: true
		})

		return new Promise((resolve, reject) => {
			fetch(this.constants.proxy + `https://min-api.cryptocompare.com/data/${ timeUnit }?fsym=${ coinName }&tsym=USD&limit=${ timeNum }&aggregate=1`)
			.then(res => {
				if(res.ok)
					resolve(res.json())
				else
					reject(res.statusText)
			})
			.catch(e => {
				reject(e)
			})
		})
	}

	getRates = (from, to) => {
		this.setState({
			isFetching: true
		})

		return new Promise((resolve, reject) => {
			fetch(this.constants.proxy + `https://min-api.cryptocompare.com/data/price?fsym=${ from }&tsyms=${ to }`)
			.then(res => {
				if(res.ok)
					resolve(res.json())
				else 
					reject(res.statusText)
			})
			.catch(e => {
				reject(e)
			})
		})
	}

	render() {
		return (
			<App 
				handleRates={this.handleRates} 
				handleConvert={this.handleConvert}
				handlePeriod={this.handlePeriod} 
				handleGraph={this.handleGraph} 
				{...this.constants} 
				{...this.state}
				/>
			)
	}
}

export default AppContainer