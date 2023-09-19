"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.role = exports.resource = exports.EOperation = void 0;
var EOperation;
(function (EOperation) {
    EOperation["create"] = "create";
    EOperation["read"] = "read";
    EOperation["update"] = "update";
    EOperation["delete"] = "delete";
})(EOperation || (exports.EOperation = EOperation = {}));
var resource;
(function (resource) {
    resource["role"] = "role";
    resource["user"] = "user";
    resource["permission"] = "permission";
})(resource || (exports.resource = resource = {}));
var role;
(function (role) {
    role["admin"] = "admin";
    role["user"] = "user";
})(role || (exports.role = role = {}));
