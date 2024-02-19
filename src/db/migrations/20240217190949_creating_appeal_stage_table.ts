import type { Knex } from "knex";

const CREATING_APPEAL_STAGE_TABLE_NAME = 'creating_appeal_stage';
const USERS_TABLE_NAME = 'users';
const DEFAULT_REGISTRATION_STAGE_ID = 1;
const DEFAULT_ORDER_NUMBER = 1;

const ColumnName = {
    ID: 'id',
    NAME: 'name',
    CREATED_AT: 'created_at',
    UPDATED_AT: 'updated_at',
    IS_CREATING_APPEAL: 'is_creating_appeal',
    CREATING_APPEAL_STAGE_ID: 'creating_appeal_stage_id',
    ORDER_NUMBER: 'order_number'
} as const;

const CreatingAppealStage = [
    'chooseCategory',
    'chooseSubcategory',
    'enterDescription',
    'sendPhotos',
    'sendGeo',
    'confirmation'
] as const;

const RelationRule = {
    CASCADE: 'CASCADE',
  } as const;


async function up(knex: Knex): Promise<void> {
    await knex.schema.createTable(CREATING_APPEAL_STAGE_TABLE_NAME, (table)=>{
        table.increments(ColumnName.ID).primary();
        table
            .string(ColumnName.NAME)
            .unique()
            .notNullable();
        table
            .integer(ColumnName.ORDER_NUMBER)
            .notNullable()
            .defaultTo(DEFAULT_ORDER_NUMBER)
        table
            .dateTime(ColumnName.CREATED_AT)
            .notNullable()
            .defaultTo(knex.fn.now());
        table
            .dateTime(ColumnName.UPDATED_AT)
            .notNullable()
            .defaultTo(knex.fn.now());
    })
    for(const [index, creatingAppealStage] of CreatingAppealStage.entries()){
        await knex(CREATING_APPEAL_STAGE_TABLE_NAME).insert([
            { 
                [ColumnName.NAME]: creatingAppealStage,
                [ColumnName.ORDER_NUMBER]: index + 1
            },
        ]);
    }
    await knex.schema.alterTable(USERS_TABLE_NAME, (table)=>{
       
        table
            .integer(ColumnName.CREATING_APPEAL_STAGE_ID)
            .references(ColumnName.ID)
            .inTable(CREATING_APPEAL_STAGE_TABLE_NAME)
            .onUpdate(RelationRule.CASCADE)
            .onDelete(RelationRule.CASCADE)
            .notNullable()
            .defaultTo(DEFAULT_REGISTRATION_STAGE_ID);
    });

   
}


async function down(knex: Knex): Promise<void> {
    await knex.schema.alterTable(USERS_TABLE_NAME, (table) => {
        table.dropColumn(ColumnName.CREATING_APPEAL_STAGE_ID);
    });
    await knex.schema.dropTable(CREATING_APPEAL_STAGE_TABLE_NAME);
    
}

export { up, down };