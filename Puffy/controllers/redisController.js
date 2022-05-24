if (!process.env.NODE_ENV) {
    require('dotenv').config()
}
const Redis = require('ioredis');

//Starting redis for cache
let redisClient;
try{
    redisClient = new Redis({
        host: process.env.REDIS_HOST || '127.0.0.1',
        port: process.env.REDIS_PORT || 6379,
        password: process.env.REDIS_SEC || "pUff7"
    });
    console.log('Initializing redis controller instance...');
} catch(err) {
    console.log(err);
    redisClient.disconnect();
}

module.exports = redisClient;
