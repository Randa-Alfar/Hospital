import BaseRoutes from "../../baseRoute/router";
import { validation } from "../../validation/validation";
import privilegeController from "./privilege.controller";
import { assignPermissionRoleSchema, assignRoleToUseSchema, privilegeSchema } from "./privilege.schema";

class PrivilegeRoute extends BaseRoutes {
    public routes(): void {
        this.router.post('/assign/permission',validation(privilegeSchema),privilegeController.assignPermission);
        this.router.post('/assign/permission_to_role',validation(assignPermissionRoleSchema),privilegeController.assignPermissionToRole);
        this.router.post('/assign/role_to_user',validation(assignRoleToUseSchema),privilegeController.assignRoleToUser);
    }
}

export default new PrivilegeRoute().router;