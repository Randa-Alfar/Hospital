"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.assignRoleToUseSchema = exports.assignPermissionRoleSchema = exports.privilegeSchema = void 0;
const joi_1 = __importDefault(require("@hapi/joi"));
const privilege_interface_1 = require("./privilege.interface");
exports.privilegeSchema = {
    body: joi_1.default.object().keys({
        resource: joi_1.default.string().min(3).max(50).valid(...Object.values(privilege_interface_1.resource)).required(),
        operation: joi_1.default.array().items(joi_1.default.string().valid(...Object.values(privilege_interface_1.EOperation))),
    }).length(2),
};
exports.assignPermissionRoleSchema = {
    body: joi_1.default.object().keys({
        role_name: joi_1.default.string().min(3).max(50).required(),
        permission_name: joi_1.default.array().items(joi_1.default.string().min(6).max(100)),
    }).length(2),
};
exports.assignRoleToUseSchema = {
    body: joi_1.default.object().keys({
        role_name: joi_1.default.string().min(3).max(50).required(),
        user_id: joi_1.default.number().min(1).integer(),
    }).length(2),
};
