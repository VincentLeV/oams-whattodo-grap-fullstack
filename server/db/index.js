const knex = require("knex")
const knexfile = require("./knexfile") 

let db = knex(knexfile.production)

if (process.env.NODE_ENV === "test") {
    db = knex(knexfile.test)
} else if (process.env.NODE_ENV === "development") {
    db = knex(knexfile.development)
}

module.exports = db