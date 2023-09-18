"use strict";
var __rest = (this && this.__rest) || function (s, e) {
    var t = {};
    for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p) && e.indexOf(p) < 0)
        t[p] = s[p];
    if (s != null && typeof Object.getOwnPropertySymbols === "function")
        for (var i = 0, p = Object.getOwnPropertySymbols(s); i < p.length; i++) {
            if (e.indexOf(p[i]) < 0 && Object.prototype.propertyIsEnumerable.call(s, p[i]))
                t[p[i]] = s[p[i]];
        }
    return t;
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const user_interface_1 = require("./user.interface");
const knex_1 = require("knex");
const knexfile_1 = require("../../../knexfile");
const uuid_1 = require("uuid");
const bcrypt_1 = __importDefault(require("bcrypt"));
const dotenv_1 = __importDefault(require("dotenv"));
dotenv_1.default.config();
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
            throw `[User-manegement] Service : cann't get users ${err}`;
        }
    }
    async createUser(user) {
        const { password } = user, res = __rest(user, ["password"]);
        const pass = await this.hashPassword(password);
        try {
            const key = (0, uuid_1.v4)();
            let userkey = await this.querybuilder('user').insert(Object.assign(Object.assign({}, res), { user_key: key, password: pass }));
            userkey = await this.querybuilder('user').select('user_key').where('id', ...userkey);
            return userkey;
        }
        catch (err) {
            throw `[User-manegement] Service : cann't create user ${err}`;
        }
    }
    async updateUser(user) {
        try {
            const { key } = user, restUser = __rest(user, ["key"]);
            await this.querybuilder('user').update(Object.assign({}, restUser)).where('user_key', key);
        }
        catch (err) {
            throw `[User-manegement] Service : cann't update user ${err}`;
        }
    }
    async getUserByKey(key) {
        const select = Object.keys(user_interface_1.EUserSelect);
        try {
            const user = await this.querybuilder('user')
                .select(select).where('user_key', key.key);
            return user;
        }
        catch (err) {
            throw `[User-manegement] Service : cann't find user ${err}`;
        }
    }
    async getUserByEmail(email) {
        const select = Object.keys(user_interface_1.EUserSelect);
        try {
            const user = await this.querybuilder('user')
                .select(select).where('email', email);
            return { user: user };
        }
        catch (err) {
            throw `[User-manegement] Service : cann't find user ${err}`;
        }
    }
    async deleteUser(key) {
        try {
            await this.querybuilder('user').where('user_key', key.key).delete();
        }
        catch (err) {
            throw `[User-manegement] Service : cann't delete user ${err}`;
        }
    }
    async logIn(user) {
        const userSelect = ['user.id', 'user.name', 'user.email', 'user.password', 'user_key'];
        const query = await this.querybuilder('user')
            .select(...userSelect, this.querybuilder.raw('json_arrayagg(role.name) as role'), this.querybuilder.raw('json_arrayagg(permission.name) as permission')).where('email', user.email)
            .leftJoin('user_has_role as uhr', 'user.id', 'uhr.user_id')
            .leftJoin('role', 'uhr.role_name', 'role.name')
            .leftJoin('role_has_permission as rhp', 'role.name', 'rhp.role_name')
            .leftJoin('permission', 'rhp.permission_name', 'permission.name')
            .groupBy('user.id');
        const hasAccess = await bcrypt_1.default.compare(user.password, query[0].password);
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
    async hashPassword(password) {
        return await bcrypt_1.default.hashSync(password, Number(process.env.SALTROUND));
    }
}
exports.default = UserService;
