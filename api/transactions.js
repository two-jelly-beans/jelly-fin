/* global require, module */
const ApiBuilder = require('claudia-api-builder')
const AWS = require('aws-sdk')
const uuid = require('uuid')

const api = new ApiBuilder()
const dynamoDb = new AWS.DynamoDB.DocumentClient()

module.exports = api

// utility functions
const getDaysInMonth = (m, y) => {
  return m===2 ? y & 3 || !(y%25) && y & 15 ? 28 : 29 : 30 + (m+(m>>3)&1)
}

// create new transaction
api.post(
  '/transaction',
  (request) => {
    'use strict'
    const data = request.body
    const timestamp = new Date().getTime()
    const params = {
      TableName: request.env.tableName,
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
    }
    // return dynamo result directly
    return dynamoDb.put(params).promise()
  },
  {
    // return HTTP status 201 - Created when successful
    success: 201
  }
)

// get transaction for {id}
api.get('/transaction/{id}', (request) => {
  const id = request.pathParams.id
  const params = {
    TableName: request.env.tableName,
    Key: {
      id: id
    }
  }

  // post-process dynamo result before returning
  return dynamoDb
    .get(params)
    .promise()
    .then(response => response.Item)
})

// get all transactions 
api.get('/transaction/all', (request) => {
  const params = {
    TableName: request.env.tableName
  }

  // post-process dynamo result before returning
  return dynamoDb
    .scan(params)
    .promise()
    .then(response => response.Items)
})

// get transactions for {month} and {year}
api.get('/transaction/tab/{year}/{month}', (request) => {
  const year = request.pathParams.year
  const month = request.pathParams.month
  const params = {
    TableName: request.env.tableName,
    FilterExpression: ':d between :val1 and :val2',
    ExpressionAttributeValues: {
      ":d": "date",
      ":val1" : year +"-"+month+"-01T00:00:00",
      ":val2" : year +"-"+month+"-"+getDaysInMonth(month, year)+"T00:00:00",
    }
  }

  // post-process dynamo result before returning
  return dynamoDb
    .scan(params)
    .promise()
    .then(response => response.Items)
})

// delete transaction with {id}
api.delete(
  '/transaction/{id}',
  request => {
    'use strict'
    var id, params

    // Get the id from the pathParams
    id = request.pathParams.id
    params = {
      TableName: request.env.tableName,
      Key: {
        id: id
      }
    }

    // return a completely different result when dynamo completes
    return dynamoDb
      .delete(params)
      .promise()
      .then(() => {
        return 'Deleted transaction with id ' + id
      })
  },
  { success: { contentType: 'text/plain' } }
)

api.addPostDeployConfig('tableName', 'DynamoDB Table Name:', 'configure-db')
