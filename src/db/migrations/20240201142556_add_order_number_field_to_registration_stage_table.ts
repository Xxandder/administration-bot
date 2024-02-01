import type { Knex } from "knex";

const TABLE_NAME = 'registration_stage';

const ColumnName = {
    ID: 'id',
    ORDER_NUMBER: 'order_number'
}

async function up(knex: Knex): Promise<void> {
    const initialValue = 1;

  return knex.schema.table(TABLE_NAME, (table) => {
    table
        .integer(ColumnName.ORDER_NUMBER)
        .notNullable()
        .defaultTo(initialValue);
  })
  .then(() => {
    return knex.transaction(async (registrationStages) => {
      const orderedRows = await registrationStages
        .select(ColumnName.ID)
        .from(TABLE_NAME)
        .orderBy(ColumnName.ORDER_NUMBER);

      await Promise.all(orderedRows.map(async (row, index) => {
        await registrationStages(TABLE_NAME)
          .where(ColumnName.ID, row.id)
          .update({ [ColumnName.ORDER_NUMBER]: index + 1 });
      }));
    });
  });
}


async function down(knex: Knex): Promise<void> {
    return knex.schema.alterTable(TABLE_NAME, (table) => {
        table.dropColumn(ColumnName.ORDER_NUMBER);
      });
}

export { up, down };
