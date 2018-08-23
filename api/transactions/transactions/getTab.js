'use strict';

const AWS = require('aws-sdk'); // eslint-disable-line import/no-extraneous-dependencies

const getDaysInMonth = (m, y) => {
  return m===2 ? y & 3 || !(y%25) && y & 15 ? 28 : 29 : 30 + (m+(m>>3)&1);
}

const dynamoDb = new AWS.DynamoDB.DocumentClient();
const params = {
  TableName: process.env.DYNAMODB_TABLE,
  FilterExpression : 'date between :val1 and :val2',
    ExpressionAttributeValues : {
        ':val1' : event.pathParameters.year +'-'+event.pathParameters.month+'-01T00:00:00',
        ':val2' : event.pathParameters.year +'-'+event.pathParameters.month+'-'+getDaysInMonth(event.pathParameters.month,event.pathParameters.year)+'T00:00:00',
    }
};

module.exports.getTab = (event, context, callback) => {
  // fetch all transactions from the database
  dynamoDb.scan(params, (error, result) => {
    // handle potential errors
    if (error) {
      console.error(error);
      callback(null, {
        statusCode: error.statusCode || 501,
        headers: { 'Content-Type': 'text/plain' },
        body: 'Couldn\'t fetch the transactions.',
      });
      return;
    }

    // create a response
    const response = {
      statusCode: 200,
      body: JSON.stringify(result.Items),
    };
    callback(null, response);
  });
};

