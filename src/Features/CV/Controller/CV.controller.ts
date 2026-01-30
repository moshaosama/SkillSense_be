import express from "express";
import type { Request, Response } from "express";
import { CVRepository } from "../Repository/CV.Repository.ts";

export class CVController {
  static async upload(req: Request, res: Response) {
    try {
      const { user_id } = req.body;
      const file = req.file;

      if (!file) return res.status(400).json({ error: "File is required" });

      const result = await CVRepository.UploadFile(user_id, file);
      res.json(result);
    } catch (err: any) {
      res.status(500).json({ error: err.message });
    }
  }
}
