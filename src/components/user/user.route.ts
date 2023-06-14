import UserController from './user.controller'
import BaseRoutes from "../../baseRoute/router";

class UserRouter extends BaseRoutes {
    public routes(): void {
        this.router.get('/user',UserController.getUser);
    }

}
export default new UserRouter().router
