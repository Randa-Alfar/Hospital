import JOI from '@hapi/joi'
import { ISchema } from '../../validation/validation.interface';

export const userUpdateSchema:ISchema = {
    body:JOI.object().keys({
        key: JOI.string().uuid().required(),
        name: JOI.string().min(3).max(15).alphanum(),
        age: JOI.number().min(7).max(100),
        DOB: JOI.date(),
        email: JOI.string().email(),
    }),
};

export const userCreateSchema:ISchema = {
    body:JOI.object().keys({
        name: JOI.string().required().min(3).max(15).alphanum(),
        age: JOI.number().min(7).max(100).required(),
        DOB: JOI.date(),
        email: JOI.string().email().required(),
        password: JOI.string().required(),
    })
};

export const userParamsSchema:ISchema = {
    params:JOI.object().keys({
        key: JOI.string().uuid().required()
    }),
};


