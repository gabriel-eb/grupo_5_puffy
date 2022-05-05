if (!process.env.NODE_ENV) {
    require('dotenv').config()
}
const Redis = require('ioredis');

//Starting redis for cache
// console.log(process.env.REDIS_HOST, process.env.REDIS_SEC);
const redisClient = new Redis({
    host: process.env.REDIS_HOST || '127.0.0.1',
    port: process.env.REDIS_PORT || 6379,
    password: process.env.REDIS_SEC || "pUff7"
});
console.log('Initializing redis controller instance...');
module.exports = redisClient;