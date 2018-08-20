/* global require, module */
const ApiBuilder = require('claudia-api-builder')
const AWS = require('aws-sdk')
const uuid = require('uuid')

const api = new ApiBuilder()
const dynamoDb = new AWS.DynamoDB.DocumentClient()

module.exports = api

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
