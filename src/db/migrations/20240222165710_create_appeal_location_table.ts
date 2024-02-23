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
    ADDRESS: 'address',
    LOCATION_ID: 'location_id'
} as const;

const RelationRule = {
    CASCADE: 'CASCADE',
    SET_NULL: 'SET NULL'
  } as const;

export async function up(knex: Knex): Promise<void> {
    await knex.schema.createTable(TableName.APPEAL_LOCATIONS, function(table) {
        table.increments(ColumnName.ID).primary();
        table.integer(ColumnName.LONGITUDE)
        table.integer(ColumnName.LATITUDE)
        table.string(ColumnName.ADDRESS)
      });
    await knex.schema.alterTable(TableName.APPEALS, table=>{
        table.dropColumn(ColumnName.LATITUDE);
        table.dropColumn(ColumnName.LONGITUDE);
        table.integer(ColumnName.LOCATION_ID)
            .references(ColumnName.ID)
            .inTable(TableName.APPEAL_LOCATIONS)
            .onUpdate(RelationRule.CASCADE)
            .onDelete(RelationRule.SET_NULL);
    })
}


export async function down(knex: Knex): Promise<void> {
    await knex.schema.alterTable(TableName.APPEALS, table=>{
        table.integer(ColumnName.LONGITUDE)
        table.integer(ColumnName.LATITUDE)
        table.dropColumn(ColumnName.LOCATION_ID)
    })
    return knex.schema.dropTableIfExists(TableName.APPEAL_LOCATIONS);
}

