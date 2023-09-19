"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.seed = void 0;
const database_enum_1 = require("../database.enum");
async function seed(knex) {
    // Deletes ALL existing entries
    await knex("operation").del();
    // Inserts seed entries
    await knex("operation").insert([
        {
            type: database_enum_1.operation.create
        },
        {
            type: database_enum_1.operation.update
        },
        {
            type: database_enum_1.operation.read
        },
        {
            type: database_enum_1.operation.delete
        },
    ]);
}
exports.seed = seed;
;
