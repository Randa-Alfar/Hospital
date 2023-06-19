import { Knex } from "knex";
import { operation, resource } from "../database.enum";


export async function up(knex: Knex): Promise<void> {
    await knex.schema.createTable('permission',(table)=>{
      table.enum('p_operation',Object.values(operation)).references('type').inTable('operation');
      table.enum('p_resource',Object.values(resource)).references('type').inTable('resource');

      table.string('name').notNullable().primary();

      //to make a coposite key
    //   table.primary(['p_operation','p_resource']);
    });
}


export async function down(knex: Knex): Promise<void> {
    await knex.schema.dropTable('permission');
}

