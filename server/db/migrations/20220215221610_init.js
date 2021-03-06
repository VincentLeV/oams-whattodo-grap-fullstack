exports.up = function(knex) {
    return knex.schema.createTable("todos", table => {
        table.uuid("id").unique()
        table.string("description").notNullable()
        table.timestamp("deadline")
        table.integer("priority").defaultTo(0)
        table.boolean("is_completed").defaultTo(false)
        table.timestamps(true, true)
    })
}

exports.down = function(knex) {
    return knex.schema.dropTable("todos")
}