'use strict';

const AWS = require('aws-sdk');
const db = new AWS.DynamoDB.DocumentClient({ apiVersion: '2012-08-10' });
const uuid = require('uuid/v4')

const postsTable = process.env.POSTS_TABLE

const response = (statusCode, message) => {
  return {
    statusCode: statusCode,
    body: JSON.stringify(message)
  }
}

module.exports.createPost = async (event, context, callback) => {
  const reqBody = JSON.parse(event.body);

  const post = {
    id: uuid(),
    createdAt: new Date().toISOString(),
    userID: 1,
    title: reqBody.title,
    body: reqBody.body
  };

  console.log(post);

  return db.put({
    TableName: postsTable,
    Item: post
  }).promise().then(() => {
    callback(null, response(201, post))
  }).catch(error => response(null, response(error.statusCode, error)));

};
