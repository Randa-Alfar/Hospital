import { Knex } from "knex";


export async function up(knex: Knex): Promise<void> {
    await knex.schema.createTable('user_has_role',(table)=>{
        table.bigInteger('user_id').unsigned().references('id').inTable('user');
        table.string('role_name').references('name').inTable('role');
    });
}


export async function down(knex: Knex): Promise<void> {
}

