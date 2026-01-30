import express from "express";
import multer from "multer";
import path from "path";
import fs from "fs";
import { CVController } from "../Controller/CV.controller.ts";
import { fileURLToPath } from "url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const router = express.Router();

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    const user_id = req.body.user_id;
    if (!user_id) return cb(new Error("user_id is required"), "");

    const uploadDir = path.join(__dirname, "uploads", user_id);
    if (!fs.existsSync(uploadDir)) fs.mkdirSync(uploadDir, { recursive: true });

    cb(null, uploadDir);
  },
  filename: (req, file, cb) => {
    const uniqueSuffix = Date.now() + "-" + Math.round(Math.random() * 1e9);
    cb(null, uniqueSuffix + path.extname(file.originalname));
  },
});

const upload = multer({ storage });

router.post("/upload", upload.single("cv"), CVController.upload);
export default router;
