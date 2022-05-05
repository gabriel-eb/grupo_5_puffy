module.exports = {
    "development": {
        "username": "root",
        "password": "rootroot",
        "database": "puffy_db",
        "host": "172.17.0.2",
        "dialect": "mysql",
        "port": 3306
    },
    "production": {
        "username": process.env.DB_USERNAME || "root",
        "password": process.env.DB_PASS || null,
        "database": process.env.DB_NAME || "database_production",
        "host": process.env.DB_URL || "127.0.0.1",
        "dialect": "mysql",
        "port": 3306
    }
}
