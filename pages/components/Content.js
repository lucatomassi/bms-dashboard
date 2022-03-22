import React from "react";
import { useState } from 'react';
import styles from "../../styles/Home.module.css";
import { Line } from "react-chartjs-2";
import { Doughnut } from "react-chartjs-2";
import { Bar } from "react-chartjs-2";
import Calendar from 'react-calendar';
import 'react-calendar/dist/Calendar.css';

var AWS = require("aws-sdk");
// const dotenv= require('dotenv');
// dotenv.config();


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
    do{
        items =  await docClient.scan(params).promise();
        items.Items.forEach((item) => scanResults.push(item));
        params.ExclusiveStartKey  = items.LastEvaluatedKey;
    }while(typeof items.LastEvaluatedKey !== "undefined");
    
    return scanResults;
};

// async function logSingleItemDdbDc(tableName){
//     try {
//         var params = {
//             Key: {
// 			 "esp32_id": "1/2022-03-22/03:56:58"
//             }, 
//             TableName: tableName
//         };
//         var result = await docClient.get(params).promise()
//         console.log(JSON.stringify(result))
//     } catch (error) {
//         console.error(error);
//     }
// }
// logSingleItemDdbDc("ESP32_DATA")




//data for bar chart

	
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


//calendar function
function calendar() {
	const [value, onChange] = useState(new Date());
  
	return (
	  <div>
		<Calendar onChange={onChange} value={value} />
	  </div>
	);
  }

//doughnut chart data set




//voltage-current data


//   function onScan(err, data) {
//     let data = [];
//     if (err) {
//         console.error("Unable to scan the table. Error JSON:", JSON.stringify(err, null, 2));
//     } else {        
//         console.log("Scan succeeded.");
//         data.Items.forEach(function(itemdata) {
//            console.log("Item :", ++count,JSON.stringify(itemdata));
//            data.push(itemdata)
//         });

//         // continue scanning if we have more items
//         if (typeof data.LastEvaluatedKey != "undefined") {
//             console.log("Scanning for more...");
//             params.ExclusiveStartKey = data.LastEvaluatedKey;
//             docClient.scan(params, onScan);
//         }
//         return data;
//     }
var params = {
	TableName: "ESP32_DATA"
};

var tempData = [];
var tempLabels = [];
var voltData = [];
var currentData =[];
var voltageData ;
var vPack =[];


function onScan(err, data) {
	let newData = [];
	if (err) {
		console.error("Unable to scan the table. Error JSON:", JSON.stringify(err, null, 2));
	} else {        
		console.log("Scan succeeded.");
		// console.log(data.Items)
		data.Items.forEach(result=>{
			newData.push(result)
		})
		//console.log(newData.slice(0,10))
		newData.slice(0,10).map(e=>{
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

		//sort time
		const sortedTimeLabel = tempLabels.sort(function(a, b){return a - b});
		console.log(sortedTimeLabel)
		//voltage
		vPack[0] = parseInt(voltData[0])+parseInt(voltData[1])+parseInt(voltData[2])+parseInt(voltData[3]);
		console.log(vPack)
	
		//fault will be a 32-bit number

	}
};


docClient.scan(params, onScan)

function Content() {
	const data0 = {
		//labels would have to be esp32_id
		labels: tempLabels,
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
				label:"Current",
				barPercentage: 1,
				barThickness: 100,
				maxBarThickness: 20,
				minBarLength: 2,
				data: [currentData],
				backgroundColor: ["#FF6384"]
	},{
				label:"Voltage",
				barPercentage: 1,
				barThickness: 100,
				maxBarThickness: 20,
				minBarLength: 2,
				data: [vPack],
				backgroundColor: [ "#36A2EB"]
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
