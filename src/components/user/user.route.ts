import UserController from './user.controller';
import BaseRoutes from "../../baseRoute/router";
import { userParamsSchema, userCreateSchema, userUpdateSchema, userLogIn } from './user.shema';
import { validation } from '../../validation/validation';

class UserRouter extends BaseRoutes {
    public routes(): void {
        this.router.get('/user',UserController.getUser);
        this.router.post('/signup',validation(userCreateSchema),UserController.createUser);
        this.router.post('/login',validation(userLogIn),UserController.login);
        this.router.put('/user',validation(userUpdateSchema),UserController.updateUser);
        this.router.get('/user/:key',validation(userParamsSchema),UserController.getUserByKey);
        this.router.delete('/user/:key',validation(userParamsSchema),UserController.deleteUser);
    }
}
export default new UserRouter().router
