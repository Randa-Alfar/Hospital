import { Knex ,knex} from "knex";
import {globalConfig} from "../../../knexfile";

class UserService {
    
    constructor(protected querybuilder:Knex<any> = knex(globalConfig)){}

    async getUsers(){
        try{
            const users = await this.querybuilder('user').select('*');
            return {users};

        }catch(err){
            throw `[User-manegement] Controller : cann't get users ${err}`;
        }
    }
}
export default UserService;