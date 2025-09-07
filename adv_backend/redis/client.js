const redis = require("ioredis");
const client = new redis({
  host: "127.0.0.1", // Docker port mapped to localhost, UI 
  port: 6379 // docker port 
});

module.exports = client;