const { uuid } = require("uuidv4")

exports.seed = async function(knex) {
  await knex("project_todos").del()
  await knex("project_todos").insert([
    {id: uuid(), description: "Low", deadline: new Date(), priority: 1, project_id: "0a19684a-1872-4230-96db-16ca4ca0037c"},
    {id: uuid(), description: "Med", deadline: new Date(), priority: 2, project_id: "c0ac4e56-ef01-4fbc-a219-5e8a7e2b3008"},
    {id: uuid(), description: "High", deadline: new Date(), priority: 3, project_id: "c0ac4e56-ef01-4fbc-a219-5e8a7e2b3008"},
  ])
}
