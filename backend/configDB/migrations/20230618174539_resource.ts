import { Knex } from "knex";
import { resource } from "../database.enum";


export async function up(knex: Knex): Promise<void> {
    await knex.schema.createTable('resource',(table)=>{
        table.enum('type',Object.values(resource)).primary();
    });
}


export async function down(knex: Knex): Promise<void> {
    await knex.schema.dropTable('resource');
}

