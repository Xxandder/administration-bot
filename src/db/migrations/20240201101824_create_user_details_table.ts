import type { Knex } from "knex";

const TableName = {
    USERS: 'users',
    USER_DETAILS: 'user_details',
} as const;

const ColumnName = {
    ID: 'id',
    USER_ID: 'user_id',
    PHONE_NUMBER: 'phone_number',
    FULL_NAME: 'full_name',
    CREATED_AT: 'created_at',
    UPDATED_AT: 'updated_at'
} as const;

const RelationRule = {
    CASCADE: 'CASCADE',
  } as const;

function up(knex: Knex): Promise<void> {
    return knex.schema.createTable(TableName.USER_DETAILS, (table)=>{
        table.increments(ColumnName.ID).primary();
        table
            .integer(ColumnName.USER_ID)
            .references(ColumnName.ID)
            .inTable(TableName.USERS)
            .onUpdate(RelationRule.CASCADE)
            .onDelete(RelationRule.CASCADE)
            .notNullable();
        table
            .string(ColumnName.PHONE_NUMBER)
            .unique()
            .defaultTo(null);
        table
            .string(ColumnName.FULL_NAME)
            .unique()
            .defaultTo(null);
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
    return knex.schema.dropTableIfExists(TableName.USER_DETAILS);
}

export { up, down };