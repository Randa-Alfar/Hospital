"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.down = exports.up = void 0;
const database_enum_1 = require("../database.enum");
async function up(knex) {
    await knex.schema.createTable('resource', (table) => {
        table.enum('type', Object.values(database_enum_1.resource)).primary();
    });
}
exports.up = up;
async function down(knex) {
    await knex.schema.dropTable('resource');
}
exports.down = down;
