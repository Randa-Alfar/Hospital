import { Request, Response } from "express";
import UserService from "./user.service";
    class UserController {
        constructor(private readonly userService:UserService = new UserService()){}

        getUser = async (req: Request, res: Response): Promise<any> => {
            try{
                const users =await this.userService.getUsers();
                res.status(200).send(users);
            }catch(err){
                res.status(400).send(`[User-manegement] Controller : cann't get users ${err}`);
            }
            
        };
    }

export default new UserController();
    
    
