import { Knex } from "knex";
import { resource } from "../database.enum";

export async function seed(knex: Knex): Promise<void> {
    // Deletes ALL existing entries
    await knex("resource").del();

    // Inserts seed entries
    await knex("resource").insert(
        [
            {
                type: resource.permisstion
            },
            {
                type: resource.role
            },
            {
                type: resource.user
            }
        ]
    );
};
