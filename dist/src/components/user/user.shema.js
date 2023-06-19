"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.userParamsSchema = exports.userCreateSchema = exports.userUpdateSchema = void 0;
const joi_1 = __importDefault(require("@hapi/joi"));
exports.userUpdateSchema = {
    body: joi_1.default.object().keys({
        key: joi_1.default.string().uuid().required(),
        name: joi_1.default.string().min(3).max(15).alphanum(),
        age: joi_1.default.number().min(7).max(100),
        DOB: joi_1.default.date(),
        email: joi_1.default.string().email(),
    }),
};
exports.userCreateSchema = {
    body: joi_1.default.object().keys({
        name: joi_1.default.string().required().min(3).max(15).alphanum(),
        age: joi_1.default.number().min(7).max(100).required(),
        DOB: joi_1.default.date(),
        email: joi_1.default.string().email().required(),
        password: joi_1.default.string().required(),
    })
};
exports.userParamsSchema = {
    params: joi_1.default.object().keys({
        key: joi_1.default.string().uuid().required()
    }),
};
