"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const user_service_1 = __importDefault(require("./user.service"));
const auth_middleware_1 = __importDefault(require("../context/auth.middleware"));
class UserController {
    constructor(userService = new user_service_1.default(), context = new auth_middleware_1.default()) {
        this.userService = userService;
        this.context = context;
        this.getUser = async (req, res) => {
            try {
                const users = await this.userService.getUsers();
                res.status(200).send(users);
            }
            catch (err) {
                res.status(400).send(`[User-manegement] Controller : cann't get users ${err}`);
            }
        };
        this.createUser = async (req, res) => {
            const user = req.body;
            try {
                const userExist = await this.userService.getUserByEmail(user.email);
                if (!userExist.user.length) {
                    const key = await this.userService.createUser(user);
                    res.status(201).send(key);
                }
                else {
                    res.status(409).send(`[User-magement] Controller : cann't create user, user already exist`);
                }
            }
            catch (err) {
                res.status(400).send(`[User-magement] Controller : cann't create user ${err}`);
            }
        };
        this.updateUser = async (req, res) => {
            const user = req.body;
            try {
                await this.userService.updateUser(user);
                res.status(200).send();
            }
            catch (err) {
                res.status(400).send(`[User-magement] Controller : cann't update user ${err}`);
            }
        };
        this.getUserByKey = async (req, res) => {
            try {
                const key = req.params;
                const user = await this.userService.getUserByKey(key);
                res.status(200).send(user);
            }
            catch (err) {
                res.status(400).send(`[User-magement] Controller : cann't find user ${err}`);
            }
        };
        this.deleteUser = async (req, res) => {
            try {
                const key = req.params;
                const userExist = await this.userService.getUserByKey(key);
                if (!userExist.length) {
                    await this.userService.deleteUser(key);
                    res.status(200).send();
                }
                else {
                    res.status(409).send(`[User-magement] Controller : cann't delete user, user doesn't exist`);
                }
            }
            catch (err) {
                res.status(400).send(`[User-magement] Controller : cann't delete user ${err}`);
            }
        };
        this.login = async (req, res) => {
            const userInfo = req.body;
            try {
                const userExist = await this.userService.getUserByEmail(userInfo.email);
                if (userExist.user.length) {
                    const user = await this.userService.logIn(userInfo);
                    if (user.hasAccess) {
                        const token = await this.context.login(user.payload);
                        res.status(201).send(token);
                    }
                }
                else {
                    res.status(409).send(`[User-magement] Controller : cann't find user, user doesn't exist`);
                }
            }
            catch (err) {
                res.status(400).send(`[User-magement] Controller : cann't login ${err}`);
            }
        };
    }
}
exports.default = new UserController();
