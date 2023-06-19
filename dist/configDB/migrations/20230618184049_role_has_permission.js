"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.down = exports.up = void 0;
async function up(knex) {
    await knex.schema.createTable('role_has_permission', (table) => {
        table.string('role_name').references('name').inTable('role');
        table.string('permission_name').references('name').inTable('permission');
        // to make a composite key
        // table.enum('p_operation',Object.values(operation));
        // table.enum('p_resource',Object.values(resource));
        // table.foreign(['p_operation','p_resource'])
        // .references(['p_operation','p_resource']).inTable('permission');
    });
}
exports.up = up;
async function down(knex) {
    await knex.schema.dropTable('role_has_permission');
}
exports.down = down;
