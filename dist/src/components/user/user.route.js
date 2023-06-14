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
    }
}
exports.default = new UserRouter().router;
