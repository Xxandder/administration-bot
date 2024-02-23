import type { Knex } from "knex";

const TableName = {
    APPEAL_LOCATIONS: 'appeal_locations',
    APPEALS: 'appeals'
} as const;

const ColumnName = {
    ID: 'id',
    CREATED_AT: 'created_at',
    UPDATED_AT: 'updated_at',
    LONGITUDE: 'longitude',
    LATITUDE: 'latitude',
    ADDRESS: 'address'
} as const;

export async function up(knex: Knex): Promise<void> {
    await knex.schema.alterTable(TableName.APPEALS, table=>{
        table.dropColumn(ColumnName.LATITUDE);
        table.dropColumn(ColumnName.LONGITUDE);
    })
    return knex.schema.createTable(TableName.APPEAL_LOCATIONS, function(table) {
        table.increments(ColumnName.ID).primary();
        table.integer(ColumnName.LONGITUDE)
        table.integer(ColumnName.LATITUDE)
        table.string(ColumnName.ADDRESS)
      });
    
}


export async function down(knex: Knex): Promise<void> {
    await knex.schema.alterTable(TableName.APPEALS, table=>{
        table.integer(ColumnName.LONGITUDE)
        table.integer(ColumnName.LATITUDE)
    })
    return knex.schema.dropTableIfExists(TableName.APPEAL_LOCATIONS);
}

