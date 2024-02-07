import type { Knex } from "knex";

const REGISTRATION_STAGE_TABLE_NAME = 'registration_stage';
const USERS_TABLE_NAME = 'users';
const DEFAULT_REGISTRATION_STAGE_ID = 1;

const ColumnName = {
    ID: 'id',
    NAME: 'name',
    CREATED_AT: 'created_at',
    UPDATED_AT: 'updated_at',
    IS_REGISTERED: 'is_registered',
    REGISTRATION_STAGE_ID: 'registration_stage_id',
} as const;

const RegistrationStage = [
    'sendingPhoneNumber',
    'typingFullName',
    'confirmation',
    'registered'
] as const;

const RelationRule = {
    CASCADE: 'CASCADE',
  } as const;


async function up(knex: Knex): Promise<void> {
    await knex.schema.createTable(REGISTRATION_STAGE_TABLE_NAME, (table)=>{
        table.increments(ColumnName.ID).primary();
        table
            .string(ColumnName.NAME)
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
    for(const registrationStage of RegistrationStage){
        await knex(REGISTRATION_STAGE_TABLE_NAME).insert([
            { [ColumnName.NAME]: registrationStage},
        ]);
    }
    await knex.schema.alterTable(USERS_TABLE_NAME, (table)=>{
        table
        .boolean(ColumnName.IS_REGISTERED)
        .notNullable()
        .defaultTo(false);
    table
        .integer(ColumnName.REGISTRATION_STAGE_ID)
        .references(ColumnName.ID)
        .inTable(REGISTRATION_STAGE_TABLE_NAME)
        .onUpdate(RelationRule.CASCADE)
        .onDelete(RelationRule.CASCADE)
        .notNullable()
        .defaultTo(DEFAULT_REGISTRATION_STAGE_ID);
    });

   
}


async function down(knex: Knex): Promise<void> {
    await knex.schema.dropTableIfExists(REGISTRATION_STAGE_TABLE_NAME);
    await knex.schema.alterTable(USERS_TABLE_NAME, (table) => {
        table.dropColumn(ColumnName.IS_REGISTERED);
        table.dropColumn(ColumnName.REGISTRATION_STAGE_ID);
    });
}

export { up, down };