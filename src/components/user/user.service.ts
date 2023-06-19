import { EUserSelect, IUser, IUserSelect, IuserUpdate } from './user.interface';
import { Knex ,knex} from "knex";
import {globalConfig} from "../../../knexfile";
import { v4 as uuidv4 } from 'uuid';

class UserService {
    
    constructor(protected querybuilder:Knex<any> = knex(globalConfig)){}

    async getUsers(){
        try{
            const users = await this.querybuilder('user').select('*');
            return {users};

        }catch(err){
            throw `[User-manegement] Service : cann't get users ${err}`;
        }
    }

    async createUser(user:IUser):Promise<number[]>{

        try{
           const key = uuidv4();
           let userkey = await this.querybuilder('user').insert({
                ...user,
                user_key: key
            });
            userkey= await this.querybuilder('user').select('user_key').where('id',...userkey)
            return userkey;
        }catch(err){
            throw `[User-manegement] Service : cann't create user ${err}`;
        }
    }

    async updateUser(user:IuserUpdate): Promise<void>{
        try{
            const {key , ...restUser} = user;
            await this.querybuilder('user').update({
                ...restUser
            }).where('user_key',key);
        }catch(err){
            throw `[User-manegement] Service : cann't update user ${err}`;
        }
        
    }

    async getUserByKey(key:any): Promise<IUserSelect[] | {}>{
        const select:string[] = Object.keys(EUserSelect);
        try{
            const user:IUserSelect[] = await this.querybuilder('user')
            .select(select).where('user_key',key.key);
            return { user };
        }catch(err){
            throw `[User-manegement] Service : cann't find user ${err}`;
        }
    }

    async deleteUser(key:any): Promise<void> {
        try{
            await this.querybuilder('user').where('user_key',key.key).delete();
        }catch(err){
            throw `[User-manegement] Service : cann't delete user ${err}`;
        }
    }
}

export default UserService;