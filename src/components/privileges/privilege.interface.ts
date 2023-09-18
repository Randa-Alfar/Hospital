export interface IPrivilege {
    resource: resource,
    operation: EOperation[],
}

export interface IPermission {
    p_resource: string,
    p_operation: string,
    name: string,
}

export interface IAssignPermissionRole {
    role_name: string,
    permission_name: string[],
}

export interface IPermissionRole extends Omit<IAssignPermissionRole, 'permission_name'>{
    permission_name: string
}

export interface IAssignRoleToUser {
    role_name: string,
    user_id:number,
}

export enum EOperation {
    create = 'create',
    read = 'read',
    update = 'update',
    delete ='delete' ,
}

export enum resource {
    role = 'role',
    user = 'user',
    permission = 'permission',
}

export enum role {
    admin = 'admin',
    user = 'user',
}