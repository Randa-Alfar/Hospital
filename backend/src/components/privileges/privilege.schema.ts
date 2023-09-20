import { ISchema } from './../../validation/validation.interface';
import JOI from '@hapi/joi'
import { EOperation, resource } from './privilege.interface';


export const privilegeSchema:ISchema = {
    body: JOI.object().keys({
        resource: JOI.string().min(3).max(50).valid(...Object.values(resource)).required(),
        operation: JOI.array().items(JOI.string().valid(...Object.values(EOperation))),
    }).length(2),
}; 

export const assignPermissionRoleSchema:ISchema = {
    body: JOI.object().keys({
        role_name: JOI.string().min(3).max(50).required(),
        permission_name: JOI.array().items(JOI.string().min(6).max(100)),
    }).length(2),
};

export const assignRoleToUseSchema:ISchema = {
    body: JOI.object().keys({
        role_name:JOI.string().min(3).max(50).required(),
        user_id: JOI.number().min(1).integer(),
    }).length(2),
};


export const unassignRoleFromUserSchema: ISchema = {
    body: JOI.object().keys({
        userId: JOI.number().min(1).required(),
        role: JOI.string().min(3).required()
    }).length(2)
}

export const unassignPermissionSchema: ISchema = {
    body: JOI.object().keys({
        role: JOI.string().min(3).required(),
        Permission: JOI.array().items(JOI.string().min(6)).required()
    })
}

export const permissionSchema: ISchema = {
    body: JOI.object().keys({
        Permission: JOI.array().items(JOI.string().min(6)).required()
    })
}