import { PrismaClient } from "@prisma/client";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import crypto from "crypto";
import { sendMail } from "../utils/sendMailUtil";

const prisma = new PrismaClient();

export class AuthService {
  private constructor() {}

  static async register(
    name: string,
    email: string,
    password: string,
    confirmPassword: string,
    role: string
  ) {
    const existingUser = await prisma.user.findUnique({
      where: { email: email },
    });

    if (existingUser) {
      throw new Error("Este e-mail já está em uso!");
    }

    if (password !== confirmPassword) {
      throw new Error("As senhas não coincidem!");
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    const user = await prisma.user.create({
      data: { name: name, email: email, password: hashedPassword, role: role },
    });

    return user;
  }

  static async login(email: string, password: string) {
    const user = await prisma.user.findUnique({ where: { email: email } });

    if (!user) {
      throw new Error("Credenciais inválidas!");
    }

    const isPassValid = await bcrypt.compare(password, user.password);

    if (!isPassValid) {
      throw new Error("Credenciais inválidas!");
    }

    const token = jwt.sign(
      {
        userId: user.id,
        email: user.email,
      },
      process.env.JWT_SECRET!,
      { expiresIn: "8h" }
    );

    return { token, user };
  }

  static async forgotPassword(email: string) {
    const user = await prisma.user.findUnique({ where: { email: email } });

    if (!user) {
      throw new Error(
        "Se o e-mail estiver na nossa base de dados, um link de recuperação será enviado!"
      );
    }

    const resetToken = crypto.randomBytes(32).toString("hex");

    const passwordResetToken = crypto
      .createHash("sha256")
      .update(resetToken)
      .digest("hex");

    const passwordResetExpires = new Date(Date.now() + 10 * 60 * 1000);

    await prisma.user.update({
      where: { email: email },
      data: {
        passwordResetToken: passwordResetToken,
        passwordResetExpires: passwordResetExpires,
      },
    });

    const resetUrl = `http://localhost/reset-password/${resetToken}`;

    try {
      const emailHtml = `
      <div style="font-family: Arial, sans-serif; line-height: 1.6;">
        <h2>Recuperação de senha</h2>
        <p>Você solicitou uma redefinição de senha. Por favor, clique no link abaixo para criar uma nova senha:</p>
        <p>
          <a href="${resetUrl}" style="background-color: #007bff; color: white; padding: 10px 15px; text-decoration: none; border-radius: 5px;">
            Redefinir senha!
          </a>
        </p>
        <p>Se você não solicitou isso, por favor, ignore este e-mail.</p>
        <p>Este link expirará em 10 minutos.</p>
      </div>
    `;

      await sendMail({
        to: email,
        subject: "Ambtec - Redefinição de senha",
        text: `Aqui estáo link para redefinir sua senha: ${resetUrl}`,
        html: emailHtml,
      });
    } catch (error: any) {
      await prisma.user.update({
        where: { email: email },
        data: {
          passwordResetToken: null,
          passwordResetExpires: null,
        },
      });

      console.log(error);

      throw new Error(
        "Houve um erro ao enviar o e-mail. Tente novamente mais tarde!"
      );
    }

    return { message: "Link de recuperação enviado!" };
  }

  static async resetPassword(
    token: string,
    password: string,
    confirmPassword: string
  ) {
    if (password !== confirmPassword) {
      throw new Error("As senhas não coincidem!");
    }

    const passwordResetToken = crypto
      .createHash("sha256")
      .update(token)
      .digest("hex");

    const user = await prisma.user.findFirst({
      where: {
        passwordResetToken: passwordResetToken,
        passwordResetExpires: { gte: new Date() },
      },
    });

    if (!user) {
      throw new Error("Token inválido ou expirado!");
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    await prisma.user.update({
      where: { id: user.id },
      data: {
        password: hashedPassword,
        passwordResetToken: null,
        passwordResetExpires: null,
      },
    });

    return { message: "Senha redefinida com sucesso!" };
  }
}
