"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const knex_1 = require("knex");
const knexfile_1 = require("../../../knexfile");
class UserService {
    constructor(querybuilder = (0, knex_1.knex)(knexfile_1.globalConfig)) {
        this.querybuilder = querybuilder;
    }
    async getUsers() {
        try {
            const users = await this.querybuilder('user').select('*');
            return { users };
        }
        catch (err) {
            throw `[User-manegement] Controller : cann't get users ${err}`;
        }
    }
}
exports.default = UserService;
