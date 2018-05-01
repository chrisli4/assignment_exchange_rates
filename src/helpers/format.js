import moment from 'moment'


const toNum = (string) => {
	return parseFloat(string);
}

const multiply = (amount, value) => {
	return (amount * value).toFixed(2);
}

const unixToDate = (unixTime) => {
	return moment.unix(unixTime).toDate();
}


// Format array to usable Chart.js format.

const formatArr = (arr) => {
	const formatted = arr.map(item => {
		return {
			x: unixToDate(item.time),
			y: toNum(item.close)
		}
	})
	return formatted;
}


// Convert user time input to values used in API requests.

const toDays = (timePeriod) => {
	const obj = {
		'Day': 12,
		'Week': 7,
		'Month': 31,
		'Year': 365
	}
	return obj[timePeriod];
}

const toTimeUnit = (timePeriod) => {
	return timePeriod === 'Days' ? 'histohour' : 'histoday';
}


// Process JSON object to formatted array/value.

const toVal = (obj, amount) => {
	for(let prop in obj) {
		return multiply(amount, toNum(obj[prop]));
	}
};

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


export { toArray, toVal, formatArr, toDays, toTimeUnit, unixToDate }

