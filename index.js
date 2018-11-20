let lodash = require('lodash');
let fs = require('fs');
const http = require('http');
const config= require('config');

const request = require('requestretry');
let movieSource = config.get('Movies.link');
let retryDelay = config.get('retryConfiguration.retryDelay');
let maxNumOfAttempts  = config.get('retryConfiguration.maxAttempts');

function myRetryStrategy(err, response,body){
    // retry the request if we had an error or if the response was a 'Bad Gateway'
    if (err || response.statusCode === 404 || response.statusCode === 502){
        console.log('status code',response.statusCode);
        return new Error ("Incorrect link");
    }
  };

  
request({
    url: movieSource,
    json: true,
    maxAttempts: maxNumOfAttempts,  // (default) try 5 times 
    retryDelay: retryDelay , // (default) wait for 5s before trying again
    retrySrategy: myRetryStrategy, // custom retry strategy which returns error on 404 or 502 
  }, function(err, response, body){
      let retryError = myRetryStrategy(err, response, body)
    if (retryError) { 
        return console.log('Error', retryError); 
    }
    // this callback will only be called when the request succeeded or after maxAttempts or on error 
    if (response) {
      console.log('The number of request attempts: ' , body);
    }
  })