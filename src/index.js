const http = require("http");
const config = require("config");
const helper = require("./helper.js");

const requestRetry = require("requestretry");
const request = require("request");
const movieSource = config.get("Movies.link");
const predefinedConfiguration = require("../config/config");

// Fetch data
requestRetry(
  {
    url: movieSource,
    json: true,
    maxAttempts: predefinedConfiguration.data.maxAttempts, // default number of request attempts
    retryDelay: predefinedConfiguration.data.retryDelay, //  wait for 5 seconds before trying again
    retryStrategy: helper.customErrorHandler // custom retry strategy which returns error on 404 or 502
  },
  (err, response, body) => {
    let retryError = helper.customErrorHandler(err, response, body);
    if (retryError) {
      return console.log(retryError);
    }

    if (response) {
      console.log("The number of request attempts: ", body);
      return body;
    }
  }
);

// post method
request.post(
  {
    //headers: { "content-type": "application/x-www-form-urlencoded" },
    url: "http://mockbin.com/request1",
    method: "POST",
    body: "Test for post request"
  },
  function(error, response, body) {
    if (error) {
      return error;
    }

    console.log('Post response', response.statusCode);
  }
);
