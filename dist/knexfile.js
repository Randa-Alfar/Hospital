"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.globalConfig = void 0;
const dotenv_1 = __importDefault(require("dotenv"));
dotenv_1.default.config();
exports.globalConfig = {
    client: process.env.DB_CLIENT,
    connection: {
        host: process.env.DB_HOST,
        userName: process.env.DB_USER,
        password: process.env.DB_PASSWORD,
        database: process.env.DB_NAME,
        port: process.env.DB_PORT,
        user: process.env.DB_USER
    }
};
const config = {
    development: {
        client: process.env.DB_CLIENT,
        connection: {
            host: process.env.DB_HOST,
            user: process.env.DB_USER,
            password: process.env.DB_PASSWORD,
            database: process.env.DB_NAME,
            port: process.env.DB_PORT,
        },
        migrations: {
            directory: "./configDB/migrations",
        },
        seeds: {
            directory: './configDB/seeds'
        }
    },
};
exports.default = config;
