import JOI from '@hapi/joi'
import { EOperation, resource } from './privilege.interface';
import { ISchema } from '../../validation/validation.interface';

export const privilegeSchema:ISchema = {
    body: JOI.object().keys({
        resource: JOI.string().min(3).max(50).valid(...Object.values(resource)).required(),
        operation: JOI.array().items(JOI.string().valid(...Object.values(EOperation))),
    }),
}; 

export const assignPermissionRoleSchema:ISchema = {
    body: JOI.object().keys({
        role_name: JOI.string().min(3).max(50).required(),
        permission_name: JOI.array().items(JOI.string().min(6).max(100)),
    }),
};

export const assignRoleToUseSchema:ISchema = {
    body: JOI.object().keys({
        role_name:JOI.string().min(3).max(50).required(),
        user_id: JOI.number().min(1).integer(),
    })
};

