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
    }
}
exports.default = new UserController();
