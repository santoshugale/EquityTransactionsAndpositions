const { env } = require('process');

const target = env.ASPNETCORE_HTTPS_PORT ? `https://localhost:${env.ASPNETCORE_HTTPS_PORT}` :
  env.ASPNETCORE_URLS ? env.ASPNETCORE_URLS.split(';')[0] : 'http://localhost:5150';

console.log("proxy loaded");
console.log('target -> ' + target);
console.log("proxy loaded");

const PROXY_CONFIG = [
  {
    context: [
      "/weatherforecast",
      "/api/positions",
      "/api/transaction",
    ],
    target,
    //target: 'http://localhost:5150',
    secure: false,
    logLevel: "debug"
  }
]

module.exports = PROXY_CONFIG;
