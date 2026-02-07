import db from "../../../utils/DB.ts";
import path from "path";
import { AppError } from "../../../utils/AppError.ts";

export class CVRepository {
  static async UploadFile(user_id: string, file: Express.Multer.File) {
    if (!user_id || !file) throw new AppError("user_id and file are required", 400);

    const relativePath = path.join(user_id, file.filename);
    const publicURL = `/uploads/${relativePath.replace(/\\/g, "/")}`;

    const query = "INSERT INTO cv (user_id, file_path) VALUES (?, ?)";
    const values = [user_id, publicURL];

    await db.execute(query, values);

    return { message: "File uploaded successfully", fileURL: publicURL };
  }
}
