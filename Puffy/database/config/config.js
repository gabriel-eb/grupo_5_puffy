if (!process.env.NODE_ENV) {
    require('dotenv').config()
}
module.exports = {
    "development": {
        "username": "root",
        "password": "rootroot",
        "database": "puffy_db",
        "host": "127.0.0.1",
        "dialect": "mysql",
        "port": 3306
    },
    "production": {
        "username": process.env.DB_USERNAME || "root",
        "password": process.env.DB_SEC || null,
        "database": process.env.DB_NAME || "database_production",
        "host": process.env.DB_HOST || "127.0.0.1",
        "dialect": "mysql",
        "port": process.env.DB_PORT || 3306
    }
}
