import { EUserSelect, IFindUser, IUser, IUserLogIn, IUserSelect, IuserUpdate } from './user.interface';
import { Knex ,knex} from "knex";
import {globalConfig} from "../../../knexfile";
import { v4 as uuidv4 } from 'uuid';
import bycrypt, { hash } from 'bcrypt'
import dotenv from 'dotenv'
dotenv.config();
class UserService {
 
    private mysql:Knex<any>;
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
        const {password, ...res} = user;
        const pass = await this.hashPassword(password);
        try{
           const key = uuidv4();
           let userkey = await this.querybuilder('user').insert({
                ...res,
                user_key: key,
                password:pass
            });
            userkey = await this.querybuilder('user').select('user_key').where('id',...userkey);
            return userkey;
        }catch(err){
            throw `[User-manegement] Service : cann't create user ${err}`;
        }
    }

    async updateUser(user:IuserUpdate): Promise<void | string>{
        try{
            const {key , ...restUser} = user;
            let userExist = await this.querybuilder('user').select('*').where('user_key',key);
            if (!userExist.length){
                return "[user-management] Service : user doesn't exist";
            } else {
                await this.querybuilder('user').update({
                    ...restUser
                }).where('user_key',key);
            }
        }catch(err){
            throw `[User-manegement] Service : cann't update user ${err}`;
        }
        
    }

    async getUserByKey(key:any): Promise<IUserSelect[]>{
        const select:string[] = Object.keys(EUserSelect);
        try{
            const user:IUserSelect[] = await this.querybuilder('user')
            .select(select).where('user_key',key.key);
            return user;
        }catch(err){
            throw `[User-manegement] Service : cann't find user ${err}`;
        }
    }

    async getUserByEmail(email:string): Promise<IFindUser>{
        const select:string[] = Object.keys(EUserSelect);
        try{
            const user:IUserSelect[] = await this.querybuilder('user')
            .select(select).where('email',email);
            return { user:user };
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

    async logIn(user:IUserLogIn): Promise<{ hasAccess: boolean, payload: any}>{
        const userSelect = ['user.id','user.name','user.email','user.password','user_key'];

        const query = await this.querybuilder('user')
                                .select(...userSelect
                                ,this.querybuilder.raw('json_arrayagg(role.name) as role')
                                ,this.querybuilder.raw('json_arrayagg(permission.name) as permission')).where('email',user.email)
                                .leftJoin('user_has_role as uhr','user.id','uhr.user_id')
                                .leftJoin('role','uhr.role_name','role.name')
                                .leftJoin('role_has_permission as rhp','role.name','rhp.role_name')
                                .leftJoin('permission','rhp.permission_name','permission.name')
                                .groupBy('user.id');

        const hasAccess = await bycrypt.compare(user.password,query[0].password);

        return {
            hasAccess: hasAccess,
            payload: {
                name: query[0].name,
                email: query[0].email,
                key: query[0].user_key,
                role: [...new Set(JSON.parse(query[0].role))],
                permission: JSON.parse(query[0].permission),
            }
        };
    }

    async hashPassword(password:string):Promise<string>{
        return await bycrypt.hashSync(password,Number(process.env.SALTROUND));
    }
}

export default UserService;