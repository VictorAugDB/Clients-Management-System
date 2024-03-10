import type { Knex } from 'knex'

export async function up(knex: Knex): Promise<void> {
  await knex.schema.createTable('clients', (table) => {
    table.uuid('id').primary()
    table.text('name').notNullable().unique()
    table.text('email').notNullable().unique()
    table.text('phone').notNullable().unique()
    table.integer('coordinate_x').notNullable()
    table.integer('coordinate_y').notNullable()
  })
}

export async function down(knex: Knex): Promise<void> {
  await knex.schema.dropTable('clients')
}
