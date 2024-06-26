import type { Knex } from "knex";

const TABLE_NAME = 'users';

const ColumnName = {
    ID: 'id',
    CHAT_ID: 'chat_id',
    CREATED_AT: 'created_at',
    UPDATED_AT: 'updated_at'
} as const;

function up(knex: Knex): Promise<void> {
    return knex.schema.createTable(TABLE_NAME, (table)=>{
        table.increments(ColumnName.ID).primary();
        table
            .string(ColumnName.CHAT_ID)
            .unique()
            .notNullable();
        table
            .dateTime(ColumnName.CREATED_AT)
            .notNullable()
            .defaultTo(knex.fn.now());
        table
            .dateTime(ColumnName.UPDATED_AT)
            .notNullable()
            .defaultTo(knex.fn.now());
    })
}


function down(knex: Knex): Promise<void> {
    return knex.schema.dropTableIfExists(TABLE_NAME);
}

export { up, down };