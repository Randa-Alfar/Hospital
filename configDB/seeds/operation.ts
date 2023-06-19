import { Knex } from "knex";
import { operation } from "../database.enum";

export async function seed(knex: Knex): Promise<void> {
    // Deletes ALL existing entries
    await knex("operation").del();

    // Inserts seed entries
    await knex("operation").insert([
        {
            type: operation.create
        },
        {
            type: operation.update
        },
        {
            type: operation.read
        },
        {
            type: operation.delete
        },
    ]);
};
