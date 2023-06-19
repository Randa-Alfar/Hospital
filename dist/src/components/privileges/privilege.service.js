"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const knex_1 = __importDefault(require("knex"));
const knexfile_1 = require("../../../knexfile");
const privilege_interface_1 = require("./privilege.interface");
class PrivilegeService {
    constructor(querybuilder = (0, knex_1.default)(knexfile_1.globalConfig)) {
        this.querybuilder = querybuilder;
    }
    async assignPermission(permission) {
        const { resource, operation } = permission;
        let selectOperation = operation || Object.values(privilege_interface_1.EOperation);
        try {
            const query = await this.querybuilder('resource')
                .select('resource.type as p_resource', 'operation.type as p_operation')
                .crossJoin('operation', function () { })
                .andWhere('resource.type', resource)
                .whereIn('operation.type', [...selectOperation]);
            const permissions = await this.createPermission(query);
            const permissionsExist = await this.querybuilder('permission').select('*').where('p_resource', resource);
            if (!permissionsExist.length) {
                await this.querybuilder('permission').insert(permissions);
                return await this.querybuilder('permission').select('name').where('p_resource', resource);
            }
            else {
                throw `[privilege-management] Service : cann't assign permission, the perrmission exist!!!`;
            }
        }
        catch (err) {
            throw `[privilege-management] Service : ${err}`;
        }
    }
    async assignPermissionToRole(data) {
        const { role_name, permission_name } = data;
        const isPermissionHasRole = await this.querybuilder('role_has_permission').select('*')
            .whereIn('permission_name', [...permission_name]).andWhere('role_name', role_name);
        try {
            if (!isPermissionHasRole.length) {
                const permissionsForRoles = await this.permisstionForRole(data);
                await this.querybuilder('role_has_permission').insert(permissionsForRoles);
            }
            else {
                throw `[privilege-management] Service : cann't assign permission to the role, the permission is already assigned!!!`;
            }
        }
        catch (err) {
            throw `[privilege-management] Service : cann't assign permission to the role ${err}`;
        }
    }
    async assignRoleToUser(userRole) {
        const isUserHasRole = await this.querybuilder('user_has_role').select('*')
            .where('user_id', userRole.user_id).andWhere('role_name', userRole.role_name);
        try {
            if (!isUserHasRole.length) {
                await this.querybuilder('user_has_role').insert([userRole]);
            }
            else {
                throw `[privilege-management] Service : cann't assign role to the user, the role is already assigned!!!`;
            }
        }
        catch (err) {
            throw `[privilege-management] Service : cann't assign role to the use ${err}`;
        }
    }
    async permisstionForRole(permissionRoles) {
        return permissionRoles.permission_name.map((permissionRole) => {
            return {
                role_name: permissionRoles.role_name,
                permission_name: permissionRole
            };
        });
    }
    async createPermission(permissions) {
        return permissions.map((permission) => {
            return Object.assign(Object.assign({}, permission), { name: permission.p_resource + '#' + permission.p_operation });
        });
    }
}
exports.default = PrivilegeService;
