import { Request } from "express";
import { JwtPayload } from "./jwt";

declare module "express" {
  export interface Request {
    user?: JwtPayload;
  }
}
