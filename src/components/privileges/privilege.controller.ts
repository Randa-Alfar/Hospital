import { Request,Response } from "express";
import { IAssignPermissionRole, IAssignRoleToUser, IPermission, IPrivilege } from "./privilege.interface";
import PrivilegeService from "./privilege.service";

class PrivilegeController {

    constructor(private readonly privilegeService:PrivilegeService = new PrivilegeService()){}

    assignPermission = async (req:Request, res:Response):Promise<any> => {
        const privilege:IPrivilege = req.body;
        try{
           const permission = await this.privilegeService.assignPermission(privilege);
           res.status(201).send(permission);
        }catch(err){
            res.status(400).send(`[privilege-management] Controller : cann't assign permission ${err}`);
        }
    }

    assignPermissionToRole = async (req:Request, res:Response): Promise<any> =>{
        const data:IAssignPermissionRole = req.body;
        try{
            await this.privilegeService.assignPermissionToRole(data);
            res.status(201).send();
        }catch(err){
            res.status(400).send(`[privilege-management] Controller : cann't assign permission to the role ${err}`);
        }
    }

    assignRoleToUser = async (req:Request, res:Response): Promise<any> => {
        const userRole:IAssignRoleToUser = req.body;
        try{
            await this.privilegeService.assignRoleToUser(userRole);
            res.status(201).send();
        }catch(err){
            res.status(400).send(`[privilege-management] Controller : cann't assign role to the user ${err}`);
        }
    }

}

export default new PrivilegeController();