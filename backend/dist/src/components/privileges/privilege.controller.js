"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const privilege_service_1 = __importDefault(require("./privilege.service"));
class PrivilegeController {
    constructor(privilegeService = new privilege_service_1.default()) {
        this.privilegeService = privilegeService;
        this.assignPermission = async (req, res) => {
            const privilege = req.body;
            try {
                const permission = await this.privilegeService.assignPermission(privilege);
                res.status(201).send(permission);
            }
            catch (err) {
                res.status(400).send(`[privilege-management] Controller : cann't assign permission ${err}`);
            }
        };
        this.assignPermissionToRole = async (req, res) => {
            const data = req.body;
            try {
                await this.privilegeService.assignPermissionToRole(data);
                res.status(201).send();
            }
            catch (err) {
                res.status(400).send(`[privilege-management] Controller : cann't assign permission to the role ${err}`);
            }
        };
        this.assignRoleToUser = async (req, res) => {
            const userRole = req.body;
            try {
                await this.privilegeService.assignRoleToUser(userRole);
                res.status(201).send();
            }
            catch (err) {
                res.status(400).send(`[privilege-management] Controller : cann't assign role to the user ${err}`);
            }
        };
        this.unassignRoleFromUser = async (req, res) => {
            const userRole = req.body;
            try {
                await this.privilegeService.unassignRoleFromUser(userRole);
                res.status(200).send();
            }
            catch (err) {
                res.status(400).send(`[privilege-management] Controller : cann't unassign role from the user ${err}`);
            }
        };
        this.unassignPermissionFromRole = async (req, res) => {
            const permissionsOfRole = req.body;
            try {
                await this.privilegeService.unassignPermissionFromRole(permissionsOfRole);
                res.status(200).send();
            }
            catch (err) {
                res.status(400).send(`[privilege-management] Controller : ${err}`);
            }
        };
        this.deletePermission = async (req, res) => {
            const permissions = req.body;
            try {
                await this.privilegeService.deletePermission(permissions);
                res.status(200).send();
            }
            catch (err) {
                res.status(400).send(`[privilege-management] Controller : ${err}`);
            }
        };
    }
}
exports.default = new PrivilegeController();
