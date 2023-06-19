"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.resource = exports.operation = void 0;
var operation;
(function (operation) {
    operation["create"] = "create";
    operation["read"] = "read";
    operation["update"] = "update";
    operation["delete"] = "delete";
})(operation || (exports.operation = operation = {}));
var resource;
(function (resource) {
    resource["user"] = "user";
    resource["role"] = "role";
    resource["permisstion"] = "permission";
})(resource || (exports.resource = resource = {}));
