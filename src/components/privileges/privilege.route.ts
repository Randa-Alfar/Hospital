import BaseRoutes from "../../baseRoute/router";
import { validation } from "../../validation/validation";
import { checkAccess } from "../context/auth.middleware";
import privilegeController from "./privilege.controller";
import { assignPermissionRoleSchema, assignRoleToUseSchema, privilegeSchema } from "./privilege.schema";

class PrivilegeRoute extends BaseRoutes {
    public routes(): void {
        this.router.post('/assign/permission',
                        // checkAccess('permission#create'),
                        validation(privilegeSchema),
                        privilegeController.assignPermission);

        this.router.post('/assign/permission_to_role',
                        checkAccess('permission#create'),
                        validation(assignPermissionRoleSchema),
                        privilegeController.assignPermissionToRole);

        this.router.post('/assign/role_to_user',
                        checkAccess('permission#create'),
                        validation(assignRoleToUseSchema),
                        privilegeController.assignRoleToUser);
    }
}

export default new PrivilegeRoute().router;