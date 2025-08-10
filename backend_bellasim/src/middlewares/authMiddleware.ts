import { Request, Response, NextFunction } from "express";
import jwt from "jsonwebtoken";
import { JwtPayload } from "../types/jwt";

export const authMiddleware = (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const token = req.cookies.token;

  if (!token) {
    res.status(401).json({ message: "Não autorizado, token não fornecido!" });
  } else {
    try {
      const decoded = jwt.verify(token, process.env.JWT_SECRET!) as JwtPayload;

      req.user = decoded;

      next();
    } catch (error) {
      res.status(401).json({ message: "Não autorizado, token inválido!" });
    }
  }
};
