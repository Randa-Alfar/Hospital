"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.seed = void 0;
const database_enum_1 = require("../database.enum");
async function seed(knex) {
    // Deletes ALL existing entries
    await knex("resource").del();
    // Inserts seed entries
    await knex("resource").insert([
        {
            type: database_enum_1.resource.permisstion
        },
        {
            type: database_enum_1.resource.role
        },
        {
            type: database_enum_1.resource.user
        }
    ]);
}
exports.seed = seed;
;
