import bcrypt from "bcryptjs";
import db from "../../../utils/DB.ts";
import type { User } from "../../../Types/Auth/type.ts";
import jwt from "jsonwebtoken";
import dotenv from "dotenv";

dotenv.config();

class AuthRepository {
  static async RegisterUser(
    user_name: string,
    email: string,
    password: string,
    avatar: string,
  ) {
    const query =
      "INSERT INTO users (user_name, email, password, avatar) VALUES (?, ?, ?, ?)";

    const Passwordhash = await bcrypt.hash(password, 2);
    const Value = [user_name, email, Passwordhash, avatar];

    const data = await db.query(query, Value);

    return data;
  }

  static async LoginUser(email: string, password: string) {
    const GetUser = "SELECT * FROM users WHERE email=? LIMIT 1";
    const valueGetUser = [email];

    const [rows] = await db.query<User[]>(GetUser, valueGetUser);

    if (!rows) {
      throw Error("you don't have account on this email");
    }

    const isValid = await bcrypt.compare(password, rows[0]?.password as string);

    if (!isValid) {
      throw Error("Password is not correct");
    }

    const token = await jwt.sign({ email: email }, process.env.SECRET_KEY!);

    return {
      data: rows[0],
      access_token: token,
    };
  }
}

export default AuthRepository;
