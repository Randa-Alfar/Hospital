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
Object.defineProperty(exports, "__esModule", { value: true });
const user_interface_1 = require("./user.interface");
const knex_1 = require("knex");
const knexfile_1 = require("../../../knexfile");
const uuid_1 = require("uuid");
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
        try {
            const key = (0, uuid_1.v4)();
            let userkey = await this.querybuilder('user').insert(Object.assign(Object.assign({}, user), { user_key: key }));
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
            return { user };
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
}
exports.default = UserService;
