import { Knex } from "knex";


export async function up(knex: Knex): Promise<void> {
    await knex.schema.createTable('role',(table)=>{
        table.string('name').notNullable().primary().unique();
        table.string('description');
    });
}

export async function down(knex: Knex): Promise<void> {
    await knex.schema.dropTable('role');
}

