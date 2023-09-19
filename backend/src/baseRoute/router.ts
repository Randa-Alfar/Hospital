import { Router } from "express";
import IRouter from "./rout.interface";
// import Context from "../components/context/auth.middleware";
abstract class BaseRoutes implements IRouter {
  public router: Router;
  // protected context: Context;
  constructor() {
    this.router = Router();
    this.routes();
    // this.context = new Context();
  }
  abstract routes(): void;
}

export default BaseRoutes;