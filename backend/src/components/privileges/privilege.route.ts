import BaseRoutes from "../../baseRoute/router";
import { validation } from "../../validation/validation";
import { checkAccess } from "../context/auth.middleware";
import privilegeController from "./privilege.controller";
import { assignPermissionRoleSchema, assignRoleToUseSchema, permissionSchema, privilegeSchema, unassignPermissionSchema, unassignRoleFromUserSchema } from "./privilege.schema";

class PrivilegeRoute extends BaseRoutes {
    public routes(): void {
        this.router.post('/assign/permission',
                        checkAccess('permission#create'),
                        validation(privilegeSchema),
                        privilegeController.assignPermission);

        this.router.post('/assign/permission_to_role',
                        checkAccess('role#create'),
                        validation(assignPermissionRoleSchema),
                        privilegeController.assignPermissionToRole);

        this.router.post('/assign/role_to_user',
                        checkAccess('role#read'),
                        validation(assignRoleToUseSchema),
                        privilegeController.assignRoleToUser);
        
        this.router.delete('/unassign/role_from_user',
                        checkAccess('role#delete'),
                        validation(unassignRoleFromUserSchema),
                        privilegeController.unassignRoleFromUser);

        this.router.delete('/unassign/permission_from_role',
                        checkAccess('permission#delete'),
                        validation(unassignPermissionSchema),
                        privilegeController.unassignPermissionFromRole);
        
        this.router.delete('/permission',
                        checkAccess('permission#delete'),
                        validation(permissionSchema),
                        privilegeController.deletePermission);
    }
}

export default new PrivilegeRoute().router;