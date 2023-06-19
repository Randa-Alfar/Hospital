"use strict";
// export const validation = (schema:JOI.ObjectSchema) => (payload:any) =>
//     schema.validate(payload, {abortEarly: false});
// const validator = validation(UserSchema);
// export const userValidation = (req:Request, res: Response, next:NextFunction) => {
//     const { body, params, query, headers, ...rest } = req;
//     const userReq: IRequest = { body, params, query, headers };
//     const { error } = validation(UserSchema)(userReq);
//     if(error){
//         throw `[user validation] there is an error in your schema ${error.message}`;
//     }else{
//         next();
//     }
// }
// class anyclass {
//     constructor(private schema: JOI.ObjectSchema) {}
//     userValidation = (req:Request, res: Response, next:NextFunction)=>{
//     const { body, params, query, headers, ...rest } = req;
//     const userReq: IRequest = { body, params, query, headers };
//     const { error } = validation(this.schema)(userReq);
//     if(error){
//         throw `[user validation] there is an error in your schema ${error.message}`;
//     }else{
//         next();
//     }
//     }
// }
// export default anyclass;
