export interface IUser {
  id: number;
  email: string;
  name: string;
  password: string;
  role: "user" | "admin";
  passwordResetToken: string;
  passwordResetExpires: Date;
}
