import express from "express";
import type { Request, Response } from "express";
import AuthRepository from "../Repository/Auth.repository.ts";

class AuthController {
  static async Register(req: Request, res: Response) {
    const { user_name, email, password, avatar } = req.body;

    if (!user_name && !email && !password && !avatar) {
      return res.status(404).json({
        statusbar: "error",
        message: "data is required",
      });
    }

    const data = await AuthRepository.RegisterUser(
      user_name,
      email,
      password,
      avatar,
    );

    return res.status(200).json({
      statusbar: "success",
      message: "Register user successfully",
      data,
    });
  }

  static async Login(req: Request, res: Response) {
    const { email, password } = req.body;

    if (!email && !password) {
      return res.status(404).json({
        statusbar: "error",
        message: "data is required",
      });
    }

    const data = await AuthRepository.LoginUser(email, password);

    return res.status(200).json({
      statusbar: "success",
      data: data?.data,
      access_token: data?.access_token,
    });
  }
}

export default AuthController;
