
const config = require("config");
const helper = require("./helper.js");

const requestRetry = require("requestretry");
const request = require("request");
const movieSource = config.get("configuration.link");
const data = config.get('configuration');
// Fetch data

requestRetry(
  {
    url: movieSource,
    json: true,
    maxAttempts: data.maxAttempts, // default number of request attempts
    retryDelay: data.retryDelay, //  wait for 5 seconds before trying again
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
    url: data.postDestination,
    method: "POST",
    body: "Test for post request"
  },
  function(error, response, body) {
    if (error) {
      return error;
    }
    //console.log('Data', body);
    console.log('Post response', response.statusCode);
  }
);
