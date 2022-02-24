exports.up = function(knex) {
    return knex.schema.createTable("projects", table => {
        table.uuid("id").unique()
        table.string("name").unique().notNullable()
        table.timestamps(true, true)
    })
}

exports.down = function(knex) {
    return knex.schema.dropTable("projects")
}
