"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.down = exports.up = void 0;
async function up(knex) {
    await knex.schema.createTable('user', (table) => {
        table.bigIncrements('id').primary;
        table.uuid('user_key').notNullable().unique();
        table.string('name').notNullable();
        table.integer('age', 100).notNullable();
        table.date('DOB');
        table.string('email', 100).notNullable();
        table.string('password').notNullable();
    });
}
exports.up = up;
async function down(knex) {
    await knex.schema.dropTable('user');
}
exports.down = down;
