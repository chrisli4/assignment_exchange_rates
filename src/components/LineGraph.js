import React from 'react';
import { Line } from 'react-chartjs-2';

const LineGraph = (props) => {

	const { coinA, coinB, trendA, trendB, startTime, endTime } = props;

	const options = {
		scales: {
			xAxes: [{
				type: 'time',
				time: {
					displayFormats: {
						week: 'll'
					},
					min: startTime,
					max: endTime,
				}
			}]
		}
	}

	const dataObj = {
		datasets: [
			{
				label: coinA,
				fill: false,
				lineTension: 0.1,
				backgroundColor: '#FF6384',
				borderColor: '#FF6384',
				borderCapStyle: 'butt',
				borderDash: [],
				borderDashOffset: 0.0,
				borderJoinStyle: 'miter',
				pointBorderColor: '#FF6384',
				pointBackgroundColor: '#FF6384',
				pointBorderWidth: 1,
				pointHoverRadius: 5,
				pointHoverBackgroundColor: '#FF6384',
				pointHoverBorderColor: '#FF6384',
				pointHoverBorderWidth: 2,
				pointRadius: 1,
				pointHitRadius: 10,
				data: trendA
			},
			{
				label: coinB,
				fill: false,
				lineTension: 0.1,
				backgroundColor: '#36A2EB',
				borderColor: '#36A2EB',
				borderCapStyle: 'butt',
				borderDash: [],
				borderDashOffset: 0.0,
				borderJoinStyle: 'miter',
				pointBorderColor: '#36A2EB',
				pointBackgroundColor: '#36A2EB',
				pointBorderWidth: 1,
				pointHoverRadius: 5,
				pointHoverBackgroundColor: '#36A2EB',
				pointHoverBorderColor: '#36A2EB',
				pointHoverBorderWidth: 2,
				pointRadius: 1,
				pointHitRadius: 10,
				data: trendB
			}
		]
	};
	return (
		<Line data={dataObj} options={options} />
	)
}
export default LineGraph