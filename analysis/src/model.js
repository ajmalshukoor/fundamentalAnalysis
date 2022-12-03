
const finnhub = require('finnhub');

const api_key = finnhub.ApiClient.instance.authentications['api_key'];
api_key.apiKey = "cdta8dqad3i41v7hlt5gcdta8dqad3i41v7hlt60" 
const finnhubClient = new finnhub.DefaultApi()

export default finnhubClient;