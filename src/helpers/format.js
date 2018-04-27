const toNum = (string) => {
	return parseFloat(string);
}

const multiply = (amount, value) => {
	return (amount * value).toFixed(2);
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

const formatData = (data) => {
	return data.map((obj) => {
		return {
			x: new Date(obj.formattedAxisTime),
			y: obj.value[0]
		}
	})
}


export { toArray, toVal, formatData }

