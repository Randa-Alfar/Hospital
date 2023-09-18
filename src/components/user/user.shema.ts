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
        password: JOI.string().min(3).alphanum().required(),
    }).length(5)
};

export const userParamsSchema:ISchema = {
    params:JOI.object().keys({
        key: JOI.string().uuid().required()
    }).length(1),
};

export const userLogIn:ISchema = {
    body: JOI.object().keys({
        email: JOI.string().email().required(),
        password: JOI.string().min(3).alphanum().required()
    }).length(2),
};


