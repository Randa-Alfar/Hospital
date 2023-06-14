import dotenv from 'dotenv';
import express, { Application, Request, Response } from "express";
import UserRouter from "./src/components/user/user.route";
import Database from './configDB/database';
import bodyParser = require('body-parser');
import cors from 'cors'

dotenv.config();
const port = process.env.PORT;

class App {
  public app: Application;

  constructor() {
    this.app = express();
    this.routes();
    this.databaseSync
    
  }

  protected databaseSync(): void {
    const db = new Database();
          db.connect();
  }

  protected async routes(): Promise<void> {
    this.app.use("/user-management",UserRouter);

  }
}
const app = new App().app;

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true}));

app.use(cors());

app.listen(port, () => {
  console.log(`[server]: Server started successfully on port ${port}`);
});