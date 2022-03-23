import React from "react";
import { useState } from 'react';
import styles from "../../styles/Home.module.css";
import { Line } from "react-chartjs-2";
import { Doughnut } from "react-chartjs-2";
import { Bar } from "react-chartjs-2";
import Modal from 'react-modal';

var AWS = require("aws-sdk");


AWS.config.update({
	region: process.env.REGION,
	endpoint: "dynamodb.us-east-1.amazonaws.com",
	credentials: {
		accessKeyId: process.env.DB_ACCESS_KEY_ID,
		secretAccessKey: process.env.DB_SECRET_ACCESS_KEY
	}
});

const docClient = new AWS.DynamoDB.DocumentClient()

var count = 0;

const customStyles = {
	content: {
		top: '50%',
		left: '50%',
		right: 'auto',
		bottom: 'auto',
		marginRight: '-50%',
		transform: 'translate(-50%, -50%)',
	},
};



const scanTable = async (tableName) => {
	const params = {
		TableName: tableName,
		// Key:{
		// 	"esp32_id": time
		// 	"temperature": temperature
		// }

	};


	const scanResults = [];
	var items;
	do {
		items = await docClient.scan(params).promise();
		items.Items.forEach((item) => scanResults.push(item));
		params.ExclusiveStartKey = items.LastEvaluatedKey;
	} while (typeof items.LastEvaluatedKey !== "undefined");

	return scanResults;
};


//calendar function
function calendar() {
	const [value, onChange] = useState(new Date());

	return (
		<div>
			<Calendar onChange={onChange} value={value} />
		</div>
	);
}

var params = {
	TableName: "ESP32_DATA"
};

var tempData = [];
var tempLabels = [];
var sortedTimeLabel = [];
var voltData = [];
var currentData = [];
var vPack = [];


function onScan(err, data) {

	let newData = [];
	if (err) {
		console.error("Unable to scan the table. Error JSON:", JSON.stringify(err, null, 2));
	} else {
		console.log("Scan succeeded.");
		// console.log(data.Items)
		data.Items.forEach(result => {
			newData.push(result)
		})
		//console.log(newData.slice(0,10))
		newData.slice(0, 10).map(e => {
			tempData.push(e.temperature);
			tempLabels.push(e.esp32_id.substr(e.esp32_id.length - 8));
			// currentData = e.chrg_current;
			// voltageData = e.voltage;
		});
		voltData[0] = newData[0].cell_1;
		voltData[1] = newData[0].cell_2;
		voltData[2] = newData[0].cell_3;
		voltData[3] = newData[0].cell_4;
		currentData[0] = newData[0].chrg_current;
		console.log(newData[0])
		console.log(tempLabels)
		console.log(currentData)


		let seconds = [];
		//converting time to seconds 
		for (let i = 0; i < 10; i++) {
			var hms = tempLabels[i];   // your input string
			var a = hms.split(':'); // split it at the colons
			// minutes are worth 60 seconds. Hours are worth 60 minutes.
			seconds.push((+a[0]) * 60 * 60 + (+a[1]) * 60 + (+a[2]));
		}


		console.log(seconds);

		let sortedSeconds = [];
		sortedSeconds = seconds.sort(function (a, b) { return a - b });
		console.log(sortedSeconds);


		for (let i = 0; i < 10; i++) {
			sortedTimeLabel.push(new Date(sortedSeconds[i] * 1000).toISOString().slice(11, 19));
			console.log(sortedSeconds[i])
		}
		console.log(sortedTimeLabel)



		//sort time
		// const sortedTimeLabel = tempLabels.sort(function(a, b){return a - b});
		// console.log(sortedTimeLabel)
		//voltage
		vPack[0] = parseInt(voltData[0]) + parseInt(voltData[1]) + parseInt(voltData[2]) + parseInt(voltData[3]);
		//console.log(vPack)

		//fault will be a 32-bit number

	}
};


docClient.scan(params, onScan)

function Content({ open, setOpen, user }) {
	const [userName, setUserName] = useState();
	console.log(open)
	const data0 = {
		//labels would have to be esp32_id
		labels: sortedTimeLabel,
		//dataset here would have to be temperature from those esp32_id
		datasets: [{
			label: 'Temperature',
			data: tempData,
			fill: false,
			borderColor: 'rgb(75, 192, 192)',
			tension: 0.5
		}]
	};

	const data2 = {
		labels: ["Current/Voltage"],
		datasets: [{
			label: "Current",
			barPercentage: 1,
			barThickness: 100,
			maxBarThickness: 20,
			minBarLength: 2,
			data: [currentData],
			backgroundColor: ["#FF6384"]
		}, {
			label: "Voltage",
			barPercentage: 1,
			barThickness: 100,
			maxBarThickness: 20,
			minBarLength: 2,
			data: [vPack],
			backgroundColor: ["#36A2EB"]
		}
		]

	};

	const dataCellVoltage = {
		labels: ["Cell1", "Cell2", "Cell3", "Cell4"],
		datasets: [
			{
				data: voltData,
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
	const customStyles = {
		content: {
			top: '50%',
			left: '50%',
			right: 'auto',
			bottom: 'auto',
			marginRight: '-50%',
			transform: 'translate(-50%, -50%)',
		},
	};

	const login = () => {
		const verify = userName.substr(userName.length - 11);
		if(verify !== "@xguard.com"){
			return alert('Invalid Email')
		}
		localStorage.setItem("username", userName);
		setOpen(false);
	}

	return (
		<>
			<Modal isOpen={open} style={customStyles} contentLabel="Login Page" >
				<input type="email" required placeholder="Username" onChange={e => setUserName(e.target.value)} />
				<input type="password" placeholder="Password" />
				<button onClick={() => login()} > Login </button>
			</Modal>


			{
				user ? (<div className={styles.contentcontainer}>
					<div className={styles.contentwrapper}>
						<div className={styles.tabs}>
							<div className={styles.categories}>
								<h1>0</h1>
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
					<br />

					<div className="graphs" >
					<div className={styles.bar2}>
						<h2>Realtime Temperature</h2>
						<Line data={data0} width={400} height={400} />
					</div>

				
						<div className={styles.bar}>
							<h2>Current/Voltage Drawn</h2>
							<Bar data={data2} width={400} height={400} />
						</div>


						<div className={styles.circle}>
							<h2>Cell Voltage</h2>
							<Doughnut data={dataCellVoltage} width={400} height={400} />
						</div>


						{/* <div className={styles.bar2}>
						<h2>Temperature History</h2>
						<Line data={data} width={400} height={400} />
					</div> */}

				
					</div> 
				</div>) : (
					<div style={{ display: "grid", placeItems: "center", height: "100vh", fontSize: "22px", fontWeight: "bold", color: "white" }} >
						Login to view the charts
					</div>
				)
			}


		</>


	);
}

export default Content;
