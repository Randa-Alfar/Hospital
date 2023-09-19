"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.down = exports.up = void 0;
const database_enum_1 = require("../database.enum");
async function up(knex) {
    await knex.schema.createTable('permission', (table) => {
        table.enum('p_operation', Object.values(database_enum_1.operation)).references('type').inTable('operation');
        table.enum('p_resource', Object.values(database_enum_1.resource)).references('type').inTable('resource');
        table.string('name').notNullable().primary();
        //to make a coposite key
        //   table.primary(['p_operation','p_resource']);
    });
}
exports.up = up;
async function down(knex) {
    await knex.schema.dropTable('permission');
}
exports.down = down;
