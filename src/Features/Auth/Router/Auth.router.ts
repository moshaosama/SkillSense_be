import express from "express";
import AuthController from "../Controller/Auth.controller.ts";

const router = express.Router();

router.post("/register", AuthController.Register);
router.post("/login", AuthController.Login);

export default router;
