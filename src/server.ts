import express from "express";
import dotenv from "dotenv";
const app = express();
import "./utils/DB.ts";
import AuthRouter from "./Features/Auth/Router/Auth.router.ts";
const Port = process.env.PORT || 3000;
dotenv.config();

app.use(express.json());
app.use(
  express.urlencoded({
    extended: false,
  }),
);

app.use("/api/v1/auth", AuthRouter);

app.listen(Port, () => {
  console.log(
    `Listening on port ${Port} successfully http://localhost:${Port}`,
  );
});
