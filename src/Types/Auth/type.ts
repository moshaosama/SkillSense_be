import type { RowDataPacket } from "mysql2";

export interface User extends RowDataPacket {
  id: string;
  user_name: string;
  email: string;
  password: string;
  avatar: string;
}
