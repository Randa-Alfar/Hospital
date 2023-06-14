import { Knex } from "knex";
import dotenv from 'dotenv'
dotenv.config();
interface IKnexConfig {
  [key:string]:Knex.Config;
}

export const globalConfig:Knex.Config<any> | string = {
    client: process.env.DB_CLIENT,
    connection: {
        host: process.env.DB_HOST,
        userName: process.env.DB_USER,
        password: process.env.DB_PASSWORD,
        database: process.env.DB_NAME,
        port: process.env.DB_PORT as unknown as number,
        user: process.env.DB_USER
    }
}

const config:IKnexConfig = {
  development:{
    client:  process.env.DB_CLIENT,
    connection: {
      host: process.env.DB_HOST,
      user: process.env.DB_USER,
      password: process.env.DB_PASSWORD,
      database: process.env.DB_NAME,
      port:process.env.DB_PORT as unknown as number,
    },
    migrations:{
      directory:"./configDB/migrations",
    },
    seeds: {
      directory: './configDB/seeds'
  }
  },
}

export default config ;


