export interface IUser {
  email: string;
  name: string;
  password: string;
  role: "user" | "admin";
  passwordResetToken: string;
  passwordResetExpires: Date;
}
