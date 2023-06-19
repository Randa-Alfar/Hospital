"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.down = exports.up = void 0;
async function up(knex) {
    await knex.schema.createTable('user_has_role', (table) => {
        table.bigInteger('user_id').unsigned().references('id').inTable('user');
        table.string('role_name').references('name').inTable('role');
    });
}
exports.up = up;
async function down(knex) {
}
exports.down = down;
