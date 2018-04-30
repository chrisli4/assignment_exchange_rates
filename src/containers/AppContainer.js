import React, { Component } from 'react'

import App from '../components/App'
import { toArray, toVal, formatArr, genStartTime } from '../helpers/format'

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
			startTime: genStartTime('Week'),
			endTime: new Date(),
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
		coinList: ['ADA','BCH','BTC','ETH','EOS','IOTA','NEO','LTC','OMG','VTC','XLM','XMR','NANO','XRP'],
		timeList: ['Day', 'Week', 'Month', 'Year']
	}

	componentDidMount() {
		this.getRates(this.state.base, null, this.state.amount, null);
		this.getRates(this.state.fBase, this.state.tBase, null, this.state.tAmount);
		this.getAll([this.getPriceTrend(this.state.coinA, this.state.timePeriod.toUpperCase()), 
			this.getPriceTrend(this.state.coinB, this.state.timePeriod.toUpperCase())]);
		
	}

	handleRates = (e) => {
		e.preventDefault()
		this.setState({
			[e.target.name]: e.target.value
		}, () => {
			this.getRates(this.state.base, null, this.state.amount, null);
		})
	}

	handleConvert = (e) => {
		e.preventDefault()
		this.setState({
			[e.target.name]: e.target.value
		}, () => {
			this.getRates(this.state.fBase, this.state.tBase, null, this.state.tAmount);
		})
	}

	handlePeriod = (e) => {
		e.preventDefault()

		this.setState({
			[e.target.name]: e.target.value,
			startTime: genStartTime(e.target.value),
			endTime: new Date()
		}, () => {

			this.getAll([this.getPriceTrend(this.state.coinA, this.state.timePeriod.toUpperCase()), 
				this.getPriceTrend(this.state.coinB, this.state.timePeriod.toUpperCase())]);

		})
	}

	handleGraph = (e) => {
		e.preventDefault()
		this.setState({
			[e.target.name]: e.target.value
		}, () => {

			this.getAll([this.getPriceTrend(this.state.coinA, this.state.timePeriod.toUpperCase()), 
				this.getPriceTrend(this.state.coinB, this.state.timePeriod.toUpperCase())]);
		})
	}

	getAll = (promiseArray) => {
		this.setState({
			isFetching: true
		})

		Promise.all(promiseArray)
		.then(res => {

			const trendAData = formatArr(res[0].price)
			const trendBData = formatArr(res[1].price)

			this.setState({
				trendA: trendAData,
				trendB: trendBData
			})
		})
		.catch(e => {

			this.setState({
				isFetching: false,
				error: e
			})
		})
	}

	getPriceTrend = (coinName, timePeriod) => {
		return new Promise((resolve, reject) => {
			fetch(`https://www.cryptorollcall.com/crcserver/charts/histo/${ timePeriod }/${ coinName }`, { mode: 'no-cors' })
			.then(res => {
				if(res.ok)
					resolve(res.json())
				else
					reject(res.statusText)
			})
			.catch(e => {
				console.log(e);
				reject(e)
			})
		})
	}

	getRates = (from, to, amount, fAmount) => {

		if(!to) {
			to = 'USD,JPY,EUR,AUD,CHF,NZD,CAD';
		}

		this.setState({isFetching: true})

		fetch(`https://min-api.cryptocompare.com/data/price?fsym=${ from }&tsyms=${ to }`)
		.then((res) => {
			if(res.ok) 
				return res.json()
			throw new Error(`${ res.status }:${ res.statusText }`)
		})
		.then(json => {
			if(fAmount)
				this.setState({
					isFetching: false,
					tAmount: toVal(json, fAmount)
				})
			else 
				this.setState({
					isFetching: false,
					rates: toArray(json, amount)
				})
		})
		.catch(e => {
			this.setState({
				isFetching: false,
				error: e
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