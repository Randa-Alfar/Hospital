"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.down = exports.up = void 0;
async function up(knex) {
    await knex.schema.createTable('role', (table) => {
        table.string('name').notNullable().primary().unique();
        table.string('description');
    });
}
exports.up = up;
async function down(knex) {
    await knex.schema.dropTable('role');
}
exports.down = down;
