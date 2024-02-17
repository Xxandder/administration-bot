import type { Knex } from "knex";

const TABLE_NAME = 'users';

const COLUMN_NAME = 'is_creating_appeal'
const INITIAL_VALUE = false;

async function up(knex: Knex): Promise<void> {
  return knex.schema.alterTable(TABLE_NAME, (table) => {
        table
            .boolean(COLUMN_NAME)
            .notNullable()
            .defaultTo(INITIAL_VALUE);
  })
}


async function down(knex: Knex): Promise<void> {
    return knex.schema.alterTable(TABLE_NAME, (table) => {
        table.dropColumn(COLUMN_NAME);
      });
}

export { up, down };
