import BaseRoutes from "../../baseRoute/router";
import privilegeController from "./privilege.controller";

class PrivilegeRoute extends BaseRoutes {
    public routes(): void {
        this.router.post('/assign/permission',privilegeController.assignPermission);
        this.router.post('/assign/permission_to_role',privilegeController.assignPermissionToRole);
        this.router.post('/assign/role_to_user',privilegeController.assignRoleToUser);
    }
}

export default new PrivilegeRoute().router;