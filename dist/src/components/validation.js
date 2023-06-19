"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.validation = void 0;
const joi_1 = __importDefault(require("@hapi/joi"));
// export const validation = (schema:JOI.ObjectSchema) => (req:Request, res: Response, next:NextFunction) => {
//     const { body, params, query, headers, ...rest } = req;
//     const iReq: IRequest = { body, params, query, headers };
//     const { error } = schema.validate(iReq, {abortEarly: false});
//     if(error){
//         throw `[validation] there is an error in your schema ${error.message}`;
//     }else{
//         next();
//     }
// };
const validation = (schema) => {
    return async (req, res, next) => {
        const dataToValidate = {};
        Object.assign(dataToValidate, {
            body: req.body,
            params: req.params,
            query: req.query,
            headers: req.headers
        });
        try {
            const result = joi_1.default.object().keys(schema).validate(dataToValidate, { abortEarly: false, allowUnknown: true });
            if (result.error) {
                res.status(404).send(`[validation] : there an error in your validation ${result.error.message}`);
            }
            else {
                Object.assign(req, result.value);
                next();
            }
        }
        catch (err) {
            res.status(400).send(`[validation] : there an error in your validation ${err}`);
        }
    };
};
exports.validation = validation;
