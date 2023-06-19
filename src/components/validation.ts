import JOI from '@hapi/joi';
import { Request, Response, NextFunction } from 'express';

export interface IRequest {
    body: Object,
    params: Object,
    query: Object,
    headers: Object,
}

export const validation = (schema:JOI.ObjectSchema) => (req:Request, res: Response, next:NextFunction) => {
    const { body, params, query, headers, ...rest } = req;
    const iReq: IRequest = { body, params, query, headers };
 
    const { error } = schema.validate(iReq, {abortEarly: false});
    if(error){
        throw `[validation] there is an error in your schema ${error.message}`;
    }else{
        next();
    }
    
};