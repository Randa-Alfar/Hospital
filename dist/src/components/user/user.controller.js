"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const user_service_1 = __importDefault(require("./user.service"));
class UserController {
    constructor(userService = new user_service_1.default()) {
        this.userService = userService;
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
                const key = await this.userService.createUser(user);
                res.status(201).send(key);
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
                await this.userService.deleteUser(key);
                res.status(200).send();
            }
            catch (err) {
            }
        };
    }
}
exports.default = new UserController();