"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const dotenv_1 = __importDefault(require("dotenv"));
const express_1 = __importDefault(require("express"));
const user_route_1 = __importDefault(require("./src/components/user/user.route"));
const database_1 = __importDefault(require("./configDB/database"));
const body_parser_1 = __importDefault(require("body-parser"));
dotenv_1.default.config();
const port = process.env.PORT;
class App {
    constructor() {
        this.app = (0, express_1.default)();
        this.routes();
        this.databaseSync();
        this.CorsConfig();
    }
    databaseSync() {
        const db = new database_1.default();
        db.connect();
    }
    CorsConfig() {
        this.app.use(body_parser_1.default.json());
        this.app.use(body_parser_1.default.urlencoded({ extended: false }));
        // this.app.use(cors());
        this.app.use(function (req, res, next) {
            res.setHeader("Access-Control-Allow-Origin", "*");
            res.setHeader("Access-Control-Allow-Credentials", "true");
            res.setHeader("Access-Control-Allow-Methods", "GET,HEAD,OPTIONS,POST,PUT");
            res.setHeader("Access-Control-Allow-Headers", "Access-Control-Allow-Origin,Access-Control-Allow-Headers, Origin,Accept, X-Requested-With, Content-Type, Access-Control-Request-Method, Access-Control-Request-Headers,Authorization");
            next();
        });
    }
    async routes() {
        this.CorsConfig();
        this.app.use("/user-management", user_route_1.default);
    }
}
const app = new App().app;
app.listen(port, () => {
    console.log(`[server]: Server started successfully on port ${port}`);
});
