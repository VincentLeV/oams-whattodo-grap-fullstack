exports.up = function(knex) {
    return knex.schema.createTable("project_todos", table => {
        table.uuid("id").unique()
        table.string("description").notNullable()
        table.timestamp("deadline")
        table.integer("priority").defaultTo(0)
        table.boolean("is_completed").defaultTo(false)
        table.uuid('project_id').references('id').inTable('projects');
        table.timestamps(true, true)
    })
}

exports.down = function(knex) {
    return knex.schema.dropTable("project_todos")
}