import type { Knex } from "knex";

const TABLE_NAME = 'files';

const OLD_COLUMN_NAME = 'url';
const NEW_COLUMN_NAME = 'file_path';

export async function up(knex: Knex): Promise<void> {
    return knex.schema.table(TABLE_NAME, function(table) {
        table.string(NEW_COLUMN_NAME).notNullable();
        return knex(TABLE_NAME)
          .update({ [NEW_COLUMN_NAME]: knex.raw(OLD_COLUMN_NAME) });
      }).then(function() {
        return knex.schema.table(TABLE_NAME, function(table) {
          table.dropColumn(OLD_COLUMN_NAME);
        });
      });
}


export async function down(knex: Knex): Promise<void> {
    return knex.schema.table(TABLE_NAME, function(table) {
        table.string(OLD_COLUMN_NAME).notNullable();
        return knex(TABLE_NAME)
          .update({ [OLD_COLUMN_NAME]: knex.raw(NEW_COLUMN_NAME) });
      }).then(function() {
        return knex.schema.table(TABLE_NAME, function(table) {
          table.dropColumn(NEW_COLUMN_NAME);
        });
      });
}

