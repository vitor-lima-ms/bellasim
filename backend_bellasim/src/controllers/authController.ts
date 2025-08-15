import { Request, Response } from "express";
import { AuthService } from "../services/authService";

export class AuthController {
  private constructor() {}

  static status(req: Request, res: Response) {
    res.status(200).json({ message: "Usuário autenticado!" });
  }

  static async register(req: Request, res: Response) {
    const name = req.body.name;
    const email = req.body.email;
    const password = req.body.password;
    const confirmPassword = req.body.confirmPassword;
    const role = req.body.role;

    try {
      const user = await AuthService.register(
        name,
        email,
        password,
        confirmPassword,
        role
      );

      const userWithoutPass: object = {
        name: user.name,
        email: user.email,
      };

      res.status(201).json({ userWithoutPass });
    } catch (error: any) {
      res.status(400).json({ message: error.message });
    }
  }

  static async login(req: Request, res: Response) {
    const email = req.body.email;
    const password = req.body.password;

    try {
      const { token, user } = await AuthService.login(email, password);

      const userWithoutPass: object = {
        name: user.name,
        email: user.email,
      };

      res.cookie("token", token, {
        httpOnly: true,
        secure: process.env.NODE_ENV === "production",
        sameSite: "lax",
        maxAge: 8 * 60 * 60 * 1000,
      });

      res.json({ user: userWithoutPass });
    } catch (error: any) {
      res.status(401).json({ message: error.message });
    }
  }

  static logout(req: Request, res: Response) {
    res.cookie("token", "", {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "lax",
      expires: new Date(0),
    });

    res.status(200).json({ message: "Logout bem sucedido!" });
  }

  static async forgotPassword(req: Request, res: Response) {
    const email = req.body.email;

    try {
      await AuthService.forgotPassword(email);

      res.status(200).json({
        message:
          "Se um e-mail correspondente for encontrado, um link de recuperação será enviado!",
      });
    } catch (error: any) {
      res.status(400).json({ message: error.message });
    }
  }

  static async resetPassword(req: Request, res: Response) {
    const token = req.params.token;
    const password = req.body.password;
    const confirmPassword = req.body.confirmPassword;

    try {
      const result = await AuthService.resetPassword(
        token,
        password,
        confirmPassword
      );

      res.status(200).json(result);
    } catch (error: any) {
      res.status(400).json({ message: error.message });
    }
  }
}
