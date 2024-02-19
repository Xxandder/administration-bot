import type { Knex } from "knex";

const TABLE_NAME = 'appeal_category';

const ColumnName = {
    ID: 'id',
    NAME: 'name',
    CREATED_AT: 'created_at',
    UPDATED_AT: 'updated_at',
} as const;

const Categories = [
    'Аварійне видалення дерев/гілля',
    'Не очищено від снігу',
    'Не покошена трава',
    'Не посипані доріжки',
    'Не прибране сміття',
    'Не прибране опале листя',
    'Відкритий люк',
    'Порив трубопроводу',
    'Відсутнє водопостачання',
    'Відсутнє освітлення',
    'Амброзія',
    'Обрив проводів електромережі',
    'Загроза опаду бурульок',
    'Інше',
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
    for(const category of Categories){
        await knex(TABLE_NAME).insert([
            { [ColumnName.NAME]: category},
        ]);
    }
}


async function down(knex: Knex): Promise<void> {
    await knex.schema.dropTable(TABLE_NAME);
}

export { up, down };