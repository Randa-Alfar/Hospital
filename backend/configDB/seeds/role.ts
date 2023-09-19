import { Knex } from "knex";

export async function seed(knex: Knex): Promise<void> {
    // Deletes ALL existing entries
    await knex("role").del();

    // Inserts seed entries
    await knex("role").insert([
        {
            name:'admin',
            description: 'admin role'
        },
        {

            name:'user',
            description: 'user role'
        }
    ]);
};
