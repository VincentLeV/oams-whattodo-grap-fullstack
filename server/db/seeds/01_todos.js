const { uuid } = require("uuidv4")

exports.seed = async function(knex) {
  await knex("todos").del()
  await knex("todos").insert([
    {id: uuid(), description: "Low", deadline: new Date(), priority: 1},
    {id: uuid(), description: "Med", deadline: new Date(), priority: 2},
    {id: uuid(), description: "High", deadline: new Date(), priority: 3},
  ])
}