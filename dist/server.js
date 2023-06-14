"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const dotenv_1 = __importDefault(require("dotenv"));
const express_1 = __importDefault(require("express"));
const user_route_1 = __importDefault(require("./src/components/user/user.route"));
const database_1 = __importDefault(require("./configDB/database"));
const bodyParser = require("body-parser");
const cors_1 = __importDefault(require("cors"));
dotenv_1.default.config();
const port = process.env.PORT;
class App {
    constructor() {
        this.app = (0, express_1.default)();
        this.routes();
        this.databaseSync;
    }
    databaseSync() {
        const db = new database_1.default();
        db.connect();
    }
    async routes() {
        this.app.use("/user-management", user_route_1.default);
    }
}
const app = new App().app;
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use((0, cors_1.default)());
app.listen(port, () => {
    console.log(`[server]: Server started successfully on port ${port}`);
});
