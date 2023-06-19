import { Knex } from "knex";


export async function up(knex: Knex): Promise<void> {
    await knex.schema.createTable('user',(table)=>{
        table.bigIncrements('id').primary;
        table.uuid('user_key').notNullable().unique();
        table.string('name').notNullable();
        table.integer('age',100).notNullable();
        table.date('DOB');
        table.string('email',100).notNullable();
        table.string('password').notNullable();
    });
}


export async function down(knex: Knex): Promise<void> {
    await knex.schema.dropTable('user');
}

