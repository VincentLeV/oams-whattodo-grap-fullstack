exports.seed = async function(knex) {
  await knex('projects').del()
  await knex('projects').insert([
    {id: "0a19684a-1872-4230-96db-16ca4ca0037c", name: "First Project"},
    {id: "c0ac4e56-ef01-4fbc-a219-5e8a7e2b3008", name: "Second Project"}
  ]);
};
