import JOI from '@hapi/joi';
import { Request, Response, NextFunction } from 'express';
import { IRequestData, ISchema } from './validation.interface';


export const validation = (schema: ISchema)=>{
    return async (req:Request,res:Response,next:NextFunction) => {
        const dataToValidate:IRequestData = {};

        Object.assign(dataToValidate,{
            body:req.body,
            params:req.params,
            query:req.query,
            headers:req.headers
        });

        try{
            const result = JOI.object().keys(<any>schema).validate(dataToValidate, { abortEarly: false, allowUnknown: true });
            if (result.error) {
                res.status(404).send({error :result.error});
            }
              else {
                Object.assign(req, result.value);
                next();
            }
        }catch(err){
            res.status(400).send(`[validation] : there an error in your validation ${err}`);
        }
    }
}