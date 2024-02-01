import type { Knex } from "knex";

const DEFAULT_REGISTRATION_STAGE_ID = 1;

const TableName = {
    USERS: 'users',
    USER_DETAILS: 'user_details',
    REGISTRATION_STAGE: 'registration_stage'
} as const;

const ColumnName = {
    ID: 'id',
    USER_ID: 'user_id',
    PHONE_NUMBER: 'phone_number',
    FULL_NAME: 'full_name',
    IS_REGISTERED: 'is_registered',
    REGISTRATION_STAGE_ID: 'registration_stage_id',
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
            .boolean(ColumnName.IS_REGISTERED)
            .notNullable()
            .defaultTo(false);
        table
            .integer(ColumnName.REGISTRATION_STAGE_ID)
            .references(ColumnName.ID)
            .inTable(TableName.REGISTRATION_STAGE)
            .onUpdate(RelationRule.CASCADE)
            .onDelete(RelationRule.CASCADE)
            .notNullable()
            .defaultTo(DEFAULT_REGISTRATION_STAGE_ID);
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