import React, { Component } from 'react'
import App from '../components/App'
import googleTrends from 'google-trends-api'
import { toArray, toVal, formatData } from '../helpers/format'

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

			startTime: new Date("2004-02-1").toISOString().split('T')[0],
			endTime: new Date().toISOString().split('T')[0],
			tCoin: 'BTC',
			trend: [],

			isFetching: false,
			error: null,
		}
	}

	constants = {
		tableHeader: [{
			name: 'Currency',
			rate: 'Rate'
		}],
		coins: ['ADA','BTC','ETH','EOS','LTC','OMG','VTC','XMR','XRB','XRP']
	}

	componentDidMount() {
		this.getRates();
		this.getRates(this.state.fBase, this.state.tBase);
		this.getTrend(this.state.tCoin);
	}

	handleRates = (e) => {
		e.preventDefault()
		this.setState({
			[e.target.name]: e.target.value
		}, () => {
			this.getRates(this.state.base)
		})
	}

	handleConvert = (e) => {
		e.preventDefault()
		this.setState({
			[e.target.name]: e.target.value
		}, () => {
			this.getRates(this.state.fBase, this.state.tBase)
		})
	}

	handleGraph = (e) => {
		e.preventDefault()
		this.setState({
			[e.target.name]: e.target.value
		}, () => {
			this.getTrend(this.state.tCoin)
		})
	}

	getTrend = (coinName) => {

		const params = {
			keyword: coinName
		}

		this.setState({
			isFetching: true
		})

		googleTrends.interestOverTime(params)
			.then(res => {
				if(!res)
					throw new Error(`${ res.status }:${ res.statusText }`)
				return res
			})
			.then(obj => {

				const trendData = JSON.parse(obj).default.timelineData

				this.setState({
					isFetching: false,
					trend: formatData(trendData)
				})
			})
			.catch(e => {
				this.setState({
					isFetching: false,
					error: e
				})
			})
	}

	getRates = (from = 'BTC', to) => {

		let convert = true;

		if(!to) {
			to = 'USD,JPY,EUR,AUD,CHF,NZD,CAD';
			convert = false;
		}

		this.setState({isFetching: true})

		fetch(`https://min-api.cryptocompare.com/data/price?fsym=${ from }&tsyms=${ to }`)
			.then((res) => {

				if(!res.ok) 
					throw new Error(`${ res.status }:${ res.statusText }`)
				return res.json()
			})
			.then(json => {

				if(convert)
					this.setState({
						isFetching: false,
						tAmount: toVal(json, this.state.fAmount)
					})
				else 
					this.setState({
						isFetching: false,
						rates: toArray(json, this.state.amount)
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
			<App handleRates={this.handleRates} handleConvert={this.handleConvert} handleGraph={this.handleGraph} {...this.constants} {...this.state}/>
		)
	}
}

export default AppContainer