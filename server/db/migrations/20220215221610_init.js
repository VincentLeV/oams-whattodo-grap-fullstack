exports.up = function(knex) {
    return knex.schema.createTable("todo", table => {
        table.increments("id")
        table.string("description").notNullable()
        table.date("deadline")
        table.integer("priority")
        table.boolean("is_completed")
        table.timestamps(true, true)
    })
}

exports.down = function(knex) {
    return knex.schema.dropTable("todo")
}