// /**
//  * Copyright 2010-2019 Amazon.com, Inc. or its affiliates. All Rights Reserved.
//  *
//  * This file is licensed under the Apache License, Version 2.0 (the "License").
//  * You may not use this file except in compliance with the License. A copy of
//  * the License is located at
//  *
//  * http://aws.amazon.com/apache2.0/
//  *
//  * This file is distributed on an "AS IS" BASIS, WITHOUT WARRANTIES OR
//  * CONDITIONS OF ANY KIND, either express or implied. See the License for the
//  * specific language governing permissions and limitations under the License.
// */
// var AWS = require("aws-sdk");
// const dotenv= require('dotenv');
// dotenv.config();
// AWS.config.update({

//   region: "us-east-1",
//   endpoint: "dynamodb.us-east-1.amazonaws.com"
// });

// const docClient = new AWS.DynamoDB.DocumentClient({ region: process.env.REGION, accessKeyId: process.env.DB_ACCESS_KEY_ID, secretAccessKey: process.env.DB_SECRET_ACCESS_KEY })



// // var table = "ESP32_DATA";

// // var year = 2015;
// // var title = "The Big New Movie";

// // var params = {
// //     TableName: table,
// //     Key:{
// //         "esp32_id": "16/35038"
// //         //"title": title
// //     }
// // };

//  const scanTable = async (tableName) => {
//     const params = {
//         TableName: tableName,
//     };

//     const scanResults = [];
//     var items;
//     do{
//         items =  await docClient.scan(params).promise();
//         items.Items.forEach((item) => scanResults.push(item));
//         params.ExclusiveStartKey  = items.LastEvaluatedKey;
//     }while(typeof items.LastEvaluatedKey !== "undefined");
    
//     return scanResults;

// };



// // scanTable("ESP32_DATA").then((data) => {
// //     console.log(data[1])
// // })




// const test = async (tableName) => {
//     var table1 = await scanTable(tableName)
//     return table1
// }

// console.log(test("ESP32_DATA"))



// // docClient.get(params, function(err, data) {
// //     if (err) {
// //         console.error("Unable to read item. Error JSON:", JSON.stringify(err, null, 2));
// //     } else {
// //         console.log("GetItem succeeded:", JSON.stringify(data, null, 2));
// //     }
// // });


