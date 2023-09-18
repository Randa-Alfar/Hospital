"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const user_controller_1 = __importDefault(require("./user.controller"));
const router_1 = __importDefault(require("../../baseRoute/router"));
const user_shema_1 = require("./user.shema");
const validation_1 = require("../../validation/validation");
const auth_middleware_1 = require("../context/auth.middleware");
class UserRouter extends router_1.default {
    routes() {
        // @middleware(checkAccess('user#read'))
        this.router.get('/user', (0, auth_middleware_1.checkAccess)('user#read'), user_controller_1.default.getUser);
        this.router.post('/signup', (0, validation_1.validation)(user_shema_1.userCreateSchema), user_controller_1.default.createUser);
        this.router.post('/login', (0, validation_1.validation)(user_shema_1.userLogIn), user_controller_1.default.login);
        this.router.put('/user', (0, auth_middleware_1.checkAccess)('user#update'), (0, validation_1.validation)(user_shema_1.userUpdateSchema), user_controller_1.default.updateUser);
        this.router.get('/user/:key', (0, auth_middleware_1.checkAccess)('user#read'), (0, validation_1.validation)(user_shema_1.userParamsSchema), user_controller_1.default.getUserByKey);
        this.router.delete('/user/:key', (0, auth_middleware_1.checkAccess)('user#delete'), (0, validation_1.validation)(user_shema_1.userParamsSchema), user_controller_1.default.deleteUser);
    }
}
exports.default = new UserRouter().router;
