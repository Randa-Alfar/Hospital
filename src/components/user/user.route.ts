import UserController from './user.controller';
import BaseRoutes from "../../baseRoute/router";

class UserRouter extends BaseRoutes {
    public routes(): void {
        this.router.get('/user',UserController.getUser);
        this.router.post('/user',UserController.createUser);
        this.router.put('/user',UserController.updateUser);
        this.router.get('/user/:key',UserController.getUserByKey);
        this.router.delete('/user/:key',UserController.deleteUser)
    }

}
export default new UserRouter().router
