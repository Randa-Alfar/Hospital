import knex, { Knex } from "knex";
import { globalConfig } from "../../../knexfile";
import { IPrivilege, EOperation, IPermission, IAssignPermissionRole, IPermissionRole, IAssignRoleToUser } from "./privilege.interface";


class PrivilegeService {
    constructor(private readonly querybuilder:Knex<any> = knex(globalConfig)){}

    async assignPermission(permission:IPrivilege):Promise<Omit<IPermission,'p_resource' | 'p_operation'>[]>{
        const { resource, operation } = permission;
        let selectOperation = operation || Object.values(EOperation);
        try{
            const query = await this.querybuilder('resource')
                .select('resource.type as p_resource','operation.type as p_operation')
                .crossJoin('operation', function (){})
                .andWhere('resource.type',resource)
                .whereIn('operation.type',[...selectOperation]);
            
            const allpermissions = await this.createPermission(query);

            const permissionsExist = await this.querybuilder('permission').select('*').where('p_resource',resource);

            const permissions = allpermissions.filter((permission) => !permissionsExist.find(({name})=>permission.name == name));

            console.log(permissions);
            if(permissions.length){
                await this.querybuilder('permission').insert(permissions);
                return await this.querybuilder('permission').select('name').where('p_resource',resource);
            }else{
                throw `[privilege-management] Service : cann't assign permission, the perrmission exist!!!`;
            }
        }catch(err){
            throw `[privilege-management] Service : ${err}`;
        }
    }

    async assignPermissionToRole(data:IAssignPermissionRole):Promise<void | any> {
        const { role_name, permission_name } = data;
        const isPermissionHasRole = await this.querybuilder('role_has_permission').select('*')
        .whereIn('permission_name',[...permission_name]).andWhere('role_name',role_name);

        try{
            if(!isPermissionHasRole.length){
                const permissionsForRoles = await this.permisstionForRole(data);
                await this.querybuilder('role_has_permission').insert(permissionsForRoles);
            }else {
                throw `[privilege-management] Service : cann't assign permission to the role, the permission is already assigned!!!`;
            }
        }catch(err){
            throw `[privilege-management] Service : cann't assign permission to the role ${err}`;
        }
           
    }

    async assignRoleToUser(userRole:IAssignRoleToUser){
        const isUserHasRole = await this.querybuilder('user_has_role').select('*')
        .where('user_id',userRole.user_id).andWhere('role_name',userRole.role_name);

        try{
            if(!isUserHasRole.length){
                await this.querybuilder('user_has_role').insert([userRole]);
            }else {
                throw `[privilege-management] Service : cann't assign role to the user, the role is already assigned!!!`;
            }
        }catch(err){
            throw `[privilege-management] Service : cann't assign role to the use ${err}`;
        }

    }


    async permisstionForRole(permissionRoles:IAssignPermissionRole):Promise<IPermissionRole[]>{
        return permissionRoles.permission_name.map((permissionRole)=>{
            return {
                role_name:permissionRoles.role_name,
                permission_name:permissionRole
            }
        });
        
    }

    async createPermission(permissions:Omit<IPermission,'name'>[]):Promise<IPermission[]> {
        return permissions.map((permission)=>{
            return {
                ...permission,
                name:permission.p_resource+'#'+permission.p_operation
            }
        });
    }
}

export default PrivilegeService;