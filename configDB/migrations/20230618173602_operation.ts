import { Knex } from "knex";
import { operation } from "../database.enum";


export async function up(knex: Knex): Promise<void> {
    await knex.schema.createTable('operation',(table)=>{
        table.enum('type',Object.values(operation)).primary();
    });
}


export async function down(knex: Knex): Promise<void> {
    await knex.schema.dropTable('operation');
}

