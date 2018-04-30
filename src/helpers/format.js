import moment from 'moment'


const toNum = (string) => {
	return parseFloat(string);
}

const multiply = (amount, value) => {
	return (amount * value).toFixed(2);
}

const unixToDate = (unixTime) => {
	return moment(unixTime).toDate();
}

const formatArr = (arr) => {

	const formatted = arr.map(item => {
		return {
			x: unixToDate(item[0]),
			y: item[1]
		}
	})

	return formatted;
}

const genStartTime = (timePeriod) => {

	const time = {
		'Day': 'days',
		'Week': 'weeks',
		'Month': 'months',
		'Year': 'years'
	}

	return moment().subtract(1, time[timePeriod]).toDate();
}

const toArray = (obj, amount) => {

	const formatted = [];

	for (let prop in obj) {
		let num = toNum(obj[prop]);
		let tmp = {
			name: prop,
			rate: multiply(amount, num)
		}

		formatted.push(tmp);
	}

	return formatted;
}

const toVal = (obj, amount) => {

	for(let prop in obj) {
		return multiply(amount, obj[prop]);
	}
};

export { toArray, toVal, formatArr, genStartTime }

