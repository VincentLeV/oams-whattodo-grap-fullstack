require( "dotenv" ).config()

const PORT = process.env.PORT || 5000
const ENV = process.env.NODE_ENV
const POSTGRES_USER = process.env.POSTGRES_USER
const POSTGRES_PASSWORD = process.env.POSTGRES_PASSWORD
const DATABASE_URL = process.env.DATABASE_URL

module.exports = {
    PORT,
    ENV,
    POSTGRES_USER,
    POSTGRES_PASSWORD,
    DATABASE_URL
}