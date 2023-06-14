import dotenv from 'dotenv';
dotenv.config();
import { Knex ,knex } from 'knex'
// Knex to get the types and knex for create the connections
class Database {
    public mysqlBuilder:Knex.Config;
    constructor(){
        this.connect()
    }

    private async connectToMysqlDb (){
        this.mysqlBuilder = knex({
            client: process.env.DB_CLIENT,
            connection: {
                host: process.env.DB_HOST,
                userName: process.env.DB_USER,
                password: process.env.DB_PASSWORD,
                database: process.env.DB_NAME,
                port: process.env.DB_PORT as unknown as number,
                user: process.env.DB_USER
            }
        });
        return this.mysqlBuilder;
    }
    
    async connect(){
       return await this.connectToMysqlDb();
    };
    
}
export default Database;