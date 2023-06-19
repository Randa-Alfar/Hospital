import { Knex } from "knex";

export async function seed(knex: Knex): Promise<void> {
    // Deletes ALL existing entries
    await knex("user").del();

    // Inserts seed entries
    await knex("user").insert([
        { id: 1, user_key: "9b1deb4d-3b7d-4bad-9bdd-2b0d7b3dcb6d", name:"randa", age: 23, DOB: "2000-03-25", email: "my.violin.ru@gmail.com", password:"123" },
        { id: 2, user_key: "9b1deb4d-wy85-4bad-9bdd-2b0d7b3dcb6d",name:"viola", age: 25, DOB: "2000-03-25", email: "viola.la@gmail.com", password:"123"},
        { id: 3, user_key: "9b1deb4d-wy85-4bad-oi87-2b0d7b3dcb6d",name:"sunny", age:7, DOB: "2000-03-25", email: "sunny.su@gmail.com", password:"123"}
    ]);
};
