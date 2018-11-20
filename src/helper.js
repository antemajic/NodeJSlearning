function customErrorHandler(err, response, body) {
  if (response.statusCode !== 200) {
    console.log("StatusCode", response.statusCode);
    return new Error("Error!!!!");
  }
}

module.exports.customErrorHandler = customErrorHandler;
