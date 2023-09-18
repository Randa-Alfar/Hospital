"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const router_1 = __importDefault(require("../../baseRoute/router"));
const validation_1 = require("../../validation/validation");
const auth_middleware_1 = require("../context/auth.middleware");
const privilege_controller_1 = __importDefault(require("./privilege.controller"));
const privilege_schema_1 = require("./privilege.schema");
class PrivilegeRoute extends router_1.default {
    routes() {
        this.router.post('/assign/permission', (0, auth_middleware_1.checkAccess)('permission#create'), (0, validation_1.validation)(privilege_schema_1.privilegeSchema), privilege_controller_1.default.assignPermission);
        this.router.post('/assign/permission_to_role', (0, auth_middleware_1.checkAccess)('permission#create'), (0, validation_1.validation)(privilege_schema_1.assignPermissionRoleSchema), privilege_controller_1.default.assignPermissionToRole);
        this.router.post('/assign/role_to_user', (0, auth_middleware_1.checkAccess)('permission#create'), (0, validation_1.validation)(privilege_schema_1.assignRoleToUseSchema), privilege_controller_1.default.assignRoleToUser);
    }
}
exports.default = new PrivilegeRoute().router;
