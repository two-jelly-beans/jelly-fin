"use strict";

const uuid = require("uuid");
const AWS = require("aws-sdk"); // eslint-disable-line import/no-extraneous-dependencies

const dynamoDb = new AWS.DynamoDB.DocumentClient();

module.exports.create = (event, context, callback) => {
  const timestamp = new Date().getTime();

  if (typeof event.body !== "undefined") {
    const data = JSON.parse(event.body);
    if (typeof data.amount !== "number") {
      console.error("Validation Failed");
      callback(null, {
        statusCode: 400,
        headers: { "Content-Type": "text/plain" },
        body:
          "Validation error. Couldn't create the transaction " +
          JSON.stringify(data)
      });
      return;
    }

    const params = {
      TableName: process.env.DYNAMODB_TABLE,
      Item: {
        id: uuid.v1(),
        date: data.date,
        category: data.category,
        paymentMethod: data.paymentMethod,
        payee: data.payee,
        note: data.note,
        amount: data.amount,
        createdAt: timestamp,
        updatedAt: timestamp
      }
    };

    // write the todo to the database
    dynamoDb.put(params, (error) => {
      // handle potential errors
      if (error) {
        console.error(error);
        callback(null, {
          statusCode: error.statusCode || 501,
          headers: { "Content-Type": "text/plain" },
          body:
            "Couldn't create the transaction.  Database write failed. Error: " +
            error
        });
        return;
      }

      // create a response
      const response = {
        statusCode: 200,
        body: JSON.stringify(params.Item)
      };
      callback(null, response);
    });
  } else {
    callback(null, {
      statusCode: 400,
      headers: { "Content-Type": "text/plain" },
      body: "Invalid body " + JSON.stringify(event, null, 2)
    });
    return;
  }
};
