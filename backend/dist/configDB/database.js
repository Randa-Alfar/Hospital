"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const dotenv_1 = __importDefault(require("dotenv"));
dotenv_1.default.config();
const knex_1 = require("knex");
// Knex to get the types and knex for create the connections
class Database {
    constructor() {
        this.connect();
    }
    async connectToMysqlDb() {
        this.mysqlBuilder = (0, knex_1.knex)({
            client: process.env.DB_CLIENT,
            connection: {
                host: process.env.DB_HOST,
                userName: process.env.DB_USER,
                password: process.env.DB_PASSWORD,
                database: process.env.DB_NAME,
                port: process.env.DB_PORT,
                user: process.env.DB_USER
            }
        });
        return this.mysqlBuilder;
    }
    async connect() {
        return await this.connectToMysqlDb();
    }
    ;
}
exports.default = Database;
