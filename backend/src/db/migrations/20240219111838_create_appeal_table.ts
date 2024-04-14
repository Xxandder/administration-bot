import type { Knex } from "knex";

const TableName = {
    APPEALS: 'appeals',
    USERS: 'users',
    APPEAL_CATEGORY: 'appeal_category'
}

const ColumnName = {
    ID: 'id',
    USER_ID: 'userId',
    CATEGORY_ID: 'categoryId',
    DESCRIPTION: 'description',
    LONGITUDE: 'longitude',
    LATITUDE: 'latitude',
    IS_FINISHED: 'is_finished',
    CREATED_AT: 'createdAt',
    UPDATED_AT: 'updatedAt'
} as const;

const RelationRule = {
    CASCADE: 'CASCADE',
    SET_NULL: 'SET NULL'
  } as const;

const MAX_DESCRIPTION_LENGTH = 255;

export async function up(knex: Knex): Promise<void> {
    await knex.schema.createTable(TableName.APPEALS, (table)=>{
        table.increments(ColumnName.ID);
        table.integer(ColumnName.USER_ID)
            .references(ColumnName.ID)
            .inTable(TableName.USERS)
            .onDelete(RelationRule.SET_NULL)
            .onUpdate(RelationRule.CASCADE);
        table.integer(ColumnName.CATEGORY_ID)
            .references(ColumnName.ID)
            .inTable(TableName.APPEAL_CATEGORY)
            .onDelete(RelationRule.SET_NULL)
            .onUpdate(RelationRule.CASCADE);
        table.integer(ColumnName.LATITUDE);
        table.integer(ColumnName.LONGITUDE);
        table.string(ColumnName.DESCRIPTION, MAX_DESCRIPTION_LENGTH);
        table.boolean(ColumnName.IS_FINISHED)
            .notNullable()
            .defaultTo(false);
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


export async function down(knex: Knex): Promise<void> {
    await knex.schema.dropTable(TableName.APPEALS);
}

