"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const path_1 = __importDefault(require("path"));
const fs_1 = __importDefault(require("fs"));
class RoutesRegistaration {
    constructor() {
        this.directory = path_1.default.join(__dirname, '../../src/components');
    }
    async getdirectory() {
        fs_1.default.readdir(this.directory, (err, files) => {
            if (err) {
                return console.log('Unable to scan directory: ' + err);
            }
            this.registerdRoutes = files.map(function (file) {
                return {
                    path: '/' + file + '-management',
                    router: file.charAt(0).toUpperCase() + file.slice(1) + 'Router'
                };
            });
            console.log(this.registerdRoutes);
        });
        return this.registerdRoutes;
    }
}
exports.default = RoutesRegistaration;
