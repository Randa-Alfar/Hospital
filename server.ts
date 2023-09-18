import dotenv from 'dotenv';
import express, { Application, Request, Response } from "express";
import UserRouter from "./src/components/user/user.route";
import Database from './configDB/database';
import bodyParser from 'body-parser';
import cors from 'cors'
import PrivilegeRoute from './src/components/privileges/privilege.route';
import morgan from "morgan";
import swaggerJSDoc from 'swagger-jsdoc'
import swaggerUI from 'swagger-ui-express'
import fs from 'fs'
import openapi from './openapi.json'

dotenv.config();
const port = process.env.PORT;

class App {
  public app: Application;

  constructor() {
    this.app = express();
    this.routes();
    this.databaseSync();
    this.CorsConfig();
    this.swagger();
  }

  protected databaseSync(): void {
    const db = new Database();
          db.connect();
  }

  protected CorsConfig () {

    this.app.use(bodyParser.json());
    this.app.use(bodyParser.urlencoded({extended: false}));
    this.app.use(morgan("dev"));
    // this.app.use(cors());

    this.app.use(function (req, res, next) {
      res.setHeader("Access-Control-Allow-Origin", "*");
      res.setHeader("Access-Control-Allow-Credentials", "true");
      res.setHeader("Access-Control-Allow-Methods", "GET,HEAD,OPTIONS,POST,PUT");
      res.setHeader("Access-Control-Allow-Headers", "Access-Control-Allow-Origin,Access-Control-Allow-Headers, Origin,Accept, X-Requested-With, Content-Type, Access-Control-Request-Method, Access-Control-Request-Headers,Authorization");
      next();
  });
  }

  protected async routes(): Promise<void> {
    this.CorsConfig();

    this.app.use("/user-management",UserRouter);
    this.app.use("/privilege-management",PrivilegeRoute);

  }

  protected async swagger(): Promise<void> {
    const swaggerDefinition = openapi;
    
    const options = {
      swaggerDefinition,
      // Paths to files containing OpenAPI definitions
      apis: [`./src/components/**/**.openapi.yml`],
    };
    
    const swaggerSpec = swaggerJSDoc(options);

    this.app.use('/docs', swaggerUI.serve, swaggerUI.setup(swaggerSpec));
  }
}
const app = new App().app;


app.listen(port, () => {
  console.log(`[server]: Server started successfully on port ${port}`);
});