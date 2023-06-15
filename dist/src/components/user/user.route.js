"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const user_controller_1 = __importDefault(require("./user.controller"));
const router_1 = __importDefault(require("../../baseRoute/router"));
class UserRouter extends router_1.default {
    routes() {
        this.router.get('/user', user_controller_1.default.getUser);
        this.router.post('/user', user_controller_1.default.createUser);
        this.router.put('/user', user_controller_1.default.updateUser);
        this.router.get('/user/:key', user_controller_1.default.getUserByKey);
        this.router.delete('/user/:key', user_controller_1.default.deleteUser);
    }
}
exports.default = new UserRouter().router;
