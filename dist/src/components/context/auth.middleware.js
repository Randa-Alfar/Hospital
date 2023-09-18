"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.checkAccess = void 0;
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const dotenv_1 = __importDefault(require("dotenv"));
dotenv_1.default.config();
class Context {
    constructor() {
        this.private_key = process.env.SECRET_KEY;
    }
    async login(user) {
        try {
            const payload = JSON.stringify(user);
            const token = jsonwebtoken_1.default.sign(payload, this.private_key);
            return { token: `Bearer ${token}` };
        }
        catch (err) {
            throw `[Auth] cann't get token ${err}`;
        }
    }
}
exports.default = Context;
// export declare type MiddlewareHandler = (req: Request, res: Response, next: NextFunction) => void;
// export declare type ClassMethodDecorator = (target: Function | object, propertyKey?: string) => void;
// export declare function middleware(middlewareHandler: MiddlewareHandler): ClassMethodDecorator;
const checkAccess = (permission) => {
    const private_key = process.env.SECRET_KEY;
    return async (req, res, next) => {
        const bearerToken = req.headers.authantication;
        const token = bearerToken === null || bearerToken === void 0 ? void 0 : bearerToken.split(' ');
        try {
            let decoded = jsonwebtoken_1.default.verify(token[1], private_key);
            if (decoded.role.includes("admin")) {
                next();
            }
            else {
                if (decoded.permission.includes(permission)) {
                    next();
                }
                else {
                    res.status(401).send(`[Auth] You don't have a permission to do this action.`);
                }
            }
        }
        catch (err) {
            res.status(401).send({ err, message: `Wrong access token!!! you are not autharized!!!` });
        }
    };
};
exports.checkAccess = checkAccess;
