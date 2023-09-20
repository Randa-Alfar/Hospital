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
        this.router.post('/assign/permission_to_role', (0, auth_middleware_1.checkAccess)('role#create'), (0, validation_1.validation)(privilege_schema_1.assignPermissionRoleSchema), privilege_controller_1.default.assignPermissionToRole);
        this.router.post('/assign/role_to_user', (0, auth_middleware_1.checkAccess)('role#read'), (0, validation_1.validation)(privilege_schema_1.assignRoleToUseSchema), privilege_controller_1.default.assignRoleToUser);
        this.router.delete('/unassign/role_from_user', (0, auth_middleware_1.checkAccess)('role#delete'), (0, validation_1.validation)(privilege_schema_1.unassignRoleFromUserSchema), privilege_controller_1.default.unassignRoleFromUser);
        this.router.delete('/unassign/permission_from_role', (0, auth_middleware_1.checkAccess)('permission#delete'), (0, validation_1.validation)(privilege_schema_1.unassignPermissionSchema), privilege_controller_1.default.unassignPermissionFromRole);
        this.router.delete('/permission', (0, auth_middleware_1.checkAccess)('permission#delete'), (0, validation_1.validation)(privilege_schema_1.permissionSchema), privilege_controller_1.default.deletePermission);
    }
}
exports.default = new PrivilegeRoute().router;
