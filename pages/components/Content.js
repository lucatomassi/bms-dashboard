import React from "react";
import styles from "../../styles/Home.module.css";
import { Line } from "react-chartjs-2";
import { Doughnut } from "react-chartjs-2";
import { Bar } from "react-chartjs-2";
import Calendar from 'react-calendar';
import 'react-calendar/dist/Calendar.css';


//data for bar chart
const data0 = {
	labels: ["10:50","10:51","10:52","10:53","10:54","10:55","10:56"],
	datasets: [{
		label: 'Temperature',
		data: [30, 30.2, 30, 30, 24, 30.5, 30.5],
		fill: false,
		borderColor: 'rgb(75, 192, 192)',
		tension: 0.5
	  }]
};
	
const data = {
	labels: [
		"January",
		"February",
		"March",
		"April",
		"May",
		"June",
		"July",
		"August",
		"September",
		"October",
		"November",
		"December",
	],
	datasets: [
		{
			label: "Temperature",
			fill: false,
			lineTension: 0.1,
			backgroundColor: "rgba(75,192,192,0.4)",
			borderColor: "rgba(75,192,192,1)",
			borderCapStyle: "butt",
			borderDash: [],
			borderDashOffset: 0.0,
			borderJoinStyle: "miter",
			pointBorderColor: "rgba(75,192,192,1)",
			pointBackgroundColor: "#fff",
			pointBorderWidth: 1,
			pointHoverRadius: 1,
			pointHoverBackgroundColor: "rgba(75,192,192,1)",
			pointHoverBorderColor: "rgba(220,220,220,1)",
			pointHoverBorderWidth: 0,
			pointRadius: 1,
			pointHitRadius: 1,
			data: [65, 59, 80, 81, 56, 55, 40, 57, 40, 48, 59, 62],
		},
	],
};

//doughnut chart data set

const dataCellVoltage = {
	labels: ["Cell1", "Cell2", "Cell3", "Cell4"],
	datasets: [
		{
			data: [4.10, 3.95, 4.12, 4.11],
			backgroundColor: ["#FF6384", "#36A2EB", "#FFCE56", "#98b755"],
			hoverBackgroundColor: ["#FF6384", "#36A2EB", "#FFCE56", "#98b755"],
		},
	],
};

const dataCellCurrent = {
	labels: ["Cell1", "Cell2", "Cell3", "Cell4"],
	datasets: [
		{
			data: [5, 4.95, 4.5, 4.98],
			backgroundColor: ["#FF6384", "#36A2EB", "#FFCE56", "#98b755"],
			hoverBackgroundColor: ["#FF6384", "#36A2EB", "#FFCE56", "#98b755"],
		},
	],
};


//voltage-current data
const data2 = {
	labels: ["Current/Voltage"],
		datasets: [{
			label:"Current",
			barPercentage: 1,
			barThickness: 100,
			maxBarThickness: 20,
			minBarLength: 2,
			data: [4],
			backgroundColor: ["#FF6384"]
},{
			label:"Voltage",
			barPercentage: 1,
			barThickness: 100,
			maxBarThickness: 20,
			minBarLength: 2,
			data: [10],
			backgroundColor: [ "#36A2EB"]
}
]

  };



function Content() {
	return (
		<div className={styles.contentcontainer}>
			<div className={styles.contentwrapper}>
				<div className={styles.tabs}>
					<div className={styles.categories}>
						<h3>Batteries Connected</h3>
					</div>
				</div>
				<div className={styles.tabs}>
					<div className={styles.categories}>
						<h3>Notifications</h3>
					</div>
				</div>
				<div className={styles.tabs}>
					<div className={styles.categories}>
						<h3>Reports</h3>
					</div>
				</div>
		
			</div>

		
			{/* chart started  */}

			<div className={styles.bar2}>
					<h2>Realtime Temperature</h2>
					<Line data={data0} width={400} height={400} />
				</div>
			
			<div className={styles.charts}>
				<div className={styles.bar}>
					<h2>Current/Voltage Drawn</h2>
					<Bar data={data2} width={400} height={400} />
				</div>
				

				<div className={styles.circle}>
					<h2>Cell Voltage</h2>
					<Doughnut data={dataCellVoltage} width={400} height={400} />
				</div>
		

				<div className={styles.bar2}>
					<h2>Temperature History</h2>
					<Line data={data} width={400} height={400} />
				</div>

			</div>
		</div>
	);
}

export default Content;
