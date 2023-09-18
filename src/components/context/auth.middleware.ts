import { resource } from './../privileges/privilege.interface';
import { NextFunction, Request, Response } from 'express';
import jwt, { JwtPayload } from "jsonwebtoken"
import dotenv from 'dotenv'
dotenv.config()

class Context {

    private private_key = process.env.SECRET_KEY;

    async login(user:any): Promise<{token:string}>{
        try{
            const payload = JSON.stringify(user);
            const token = jwt.sign(payload,this.private_key as string);
            return { token: `Bearer ${token}` };
        }catch(err){
            throw `[Auth] cann't get token ${err}`;
        }
    }

}

export default Context;
// export declare type MiddlewareHandler = (req: Request, res: Response, next: NextFunction) => void;
// export declare type ClassMethodDecorator = (target: Function | object, propertyKey?: string) => void;
// export declare function middleware(middlewareHandler: MiddlewareHandler): ClassMethodDecorator;

export const checkAccess = (permission: string) => {
    const private_key = process.env.SECRET_KEY;
    return async (req: Request,res: Response, next: NextFunction)=> {
        const bearerToken = req.headers.authantication as string;
        const token  = bearerToken?.split(' ');

        try{
            let decoded = jwt.verify(token[1],private_key as string) as JwtPayload;
        
            if(decoded.role.includes("admin")){
                next();
            }else{
                if(decoded.permission.includes(permission)){
                    next();
                }else{
                    res.status(401).send(`[Auth] You don't have a permission to do this action.`);
                }
            }
            
        }catch(err){
            res.status(401).send({err, message: `Wrong access token!!! you are not autharized!!!`});
        }
    }
} 
