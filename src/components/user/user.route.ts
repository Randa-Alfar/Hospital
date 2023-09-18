import UserController from './user.controller';
import BaseRoutes from "../../baseRoute/router";
import { userParamsSchema, userCreateSchema, userUpdateSchema, userLogIn } from './user.shema';
import { validation } from '../../validation/validation';
import { checkAccess } from '../context/auth.middleware';
class UserRouter extends BaseRoutes {
    public routes(): void {
        // @middleware(checkAccess('user#read'))
        this.router.get('/user',checkAccess('user#read'),UserController.getUser);
        this.router.post('/signup',validation(userCreateSchema),UserController.createUser);
        this.router.post('/login',validation(userLogIn),UserController.login);
        this.router.put('/user',checkAccess('user#update'),validation(userUpdateSchema),UserController.updateUser);
        this.router.get('/user/:key',checkAccess('user#read'),validation(userParamsSchema),UserController.getUserByKey);
        this.router.delete('/user/:key',checkAccess('user#delete'),validation(userParamsSchema),UserController.deleteUser);
    }
}
export default new UserRouter().router
