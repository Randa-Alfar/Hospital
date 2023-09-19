import { Knex } from "knex";
import { operation, resource } from "../database.enum";


export async function up(knex: Knex): Promise<void> {
    await knex.schema.createTable('role_has_permission',(table)=>{
        table.string('role_name').references('name').inTable('role');
        table.string('permission_name').references('name').inTable('permission');

        // to make a composite key
        // table.enum('p_operation',Object.values(operation));
        // table.enum('p_resource',Object.values(resource));

        // table.foreign(['p_operation','p_resource'])
        // .references(['p_operation','p_resource']).inTable('permission');
    });
}


export async function down(knex: Knex): Promise<void> {
    await knex.schema.dropTable('role_has_permission');
}

