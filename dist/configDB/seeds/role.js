"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.seed = void 0;
async function seed(knex) {
    // Deletes ALL existing entries
    await knex("role").del();
    // Inserts seed entries
    await knex("role").insert([
        {
            name: 'admin',
            description: 'admin role'
        },
        {
            name: 'user',
            description: 'user role'
        }
    ]);
}
exports.seed = seed;
;
