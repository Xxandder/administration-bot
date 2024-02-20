import type { Knex } from "knex";

const TableName = {
    APPEALS_PHOTOS: 'appeals_photos',
    APPEALS: 'appeals',
    FILES: 'files'
};

const ColumnName = {
    ID: 'id',
    APPEAL_ID:' appeal_id',
    FILE_ID: 'file_id',
    CREATED_AT: 'created_at',
    UPDATED_AT: 'updated_at'
}

const RelationRule = {
    CASCADE: 'CASCADE',
    SET_NULL: 'SET NULL'
  } as const;

export async function up(knex: Knex): Promise<void> {
    await knex.schema.createTable(TableName.APPEALS_PHOTOS, (table)=>{
        table.increments(ColumnName.ID);
        table
            .integer(ColumnName.APPEAL_ID)
            .references(ColumnName.ID)
            .inTable(TableName.APPEALS)
            .onDelete(RelationRule.CASCADE)
            .onUpdate(RelationRule.CASCADE)
        table
            .integer(ColumnName.FILE_ID)
            .references(ColumnName.ID)
            .inTable(TableName.FILES)
            .onDelete(RelationRule.CASCADE)
            .onUpdate(RelationRule.CASCADE)
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
    await knex.schema.dropTable(TableName.APPEALS_PHOTOS);
}

