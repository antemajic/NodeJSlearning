const config = require("config");

const data = config.get(process.env.NODE_ENV || "dev1");

module.exports.data = data;
