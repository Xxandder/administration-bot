import type { Knex } from "knex";

const TABLE_NAME = 'registration_stage';

const ColumnName = {
    ID: 'id',
    NAME: 'name',
    CREATED_AT: 'created_at',
    UPDATED_AT: 'updated_at'
} as const;

const RegistrationStage = [
    'sendingPhoneNumber',
    'typingFullName',
    'confirmation',
    'registered'
] as const;

async function up(knex: Knex): Promise<void> {
    await knex.schema.createTable(TABLE_NAME, (table)=>{
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
        await knex(TABLE_NAME).insert([
            { [ColumnName.NAME]: registrationStage},
        ]);
    }
   
}


function down(knex: Knex): Promise<void> {
    return knex.schema.dropTableIfExists(TABLE_NAME);
}

export { up, down };