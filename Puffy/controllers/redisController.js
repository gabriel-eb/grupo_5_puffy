if (!process.env.NODE_ENV) {
    require('dotenv').config()
}
const redis = require('redis');

//Starting redis
const redisClient = redis.createClient({
    host: process.env.REDIS_HOST || '127.0.0.1',
    port: 6279,
    password: process.env.REDIS_SEC || "pUff7"
});
redisClient.on('error', err => console.log('Redis client Error', err));
(async () => await redisClient.connect())();
console.log('Initializing redis instance...')
module.exports = redisClient;