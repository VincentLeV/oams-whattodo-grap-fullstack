require('dotenv').config({ path: '../.env' })
const { POSTGRES_USER, POSTGRES_PASSWORD, DATABASE_URL } = require("../utils/config")

module.exports = {
    development: {
        client: 'postgresql',
        connection: {
            database: 'oams-whattodo-perg-dev',
            user:     POSTGRES_USER,
            password: POSTGRES_PASSWORD
        },
        pool: {
            min: 2,
            max: 10
        },
        migrations: {
            tableName: 'knex_migrations'
        }
    },
    test: {
        client: 'postgresql',
        connection: {
            database: 'oams-whattodo-perg-test',
            user:     process.env.POSTGRES_USER,
            password: process.env.POSTGRES_PASSWORD
        },
        pool: {
            min: 2,
            max: 10
        },
        migrations: {
            tableName: 'knex_migrations'
        }
    },
    production: {
        client: "pg",
        connection: {
            connectionString: DATABASE_URL,
            ssl: { rejectUnauthorized: false },
        },
    },
}