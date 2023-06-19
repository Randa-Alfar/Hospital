"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const user_controller_1 = __importDefault(require("./user.controller"));
const router_1 = __importDefault(require("../../baseRoute/router"));
const user_shema_1 = require("./user.shema");
const validation_1 = require("../../validation/validation");
class UserRouter extends router_1.default {
    routes() {
        this.router.get('/user', user_controller_1.default.getUser);
        this.router.post('/signup', (0, validation_1.validation)(user_shema_1.userCreateSchema), user_controller_1.default.createUser);
        this.router.put('/user', (0, validation_1.validation)(user_shema_1.userUpdateSchema), user_controller_1.default.updateUser);
        this.router.get('/user/:key', (0, validation_1.validation)(user_shema_1.userParamsSchema), user_controller_1.default.getUserByKey);
        this.router.delete('/user/:key', (0, validation_1.validation)(user_shema_1.userParamsSchema), user_controller_1.default.deleteUser);
    }
}
exports.default = new UserRouter().router;
