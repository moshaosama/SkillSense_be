import express from "express";
import dotenv from "dotenv";
import cors from "cors";
const app = express();
import "./utils/DB.ts";
import AuthRouter from "./Features/Auth/Router/Auth.router.ts";
import CVRouter from "./Features/CV/Router/Cv.router.ts";
import path from "path";
const Port = process.env.PORT || 3000;
dotenv.config();

app.use(express.json());
app.use(
  express.urlencoded({
    extended: false,
  }),
);
app.use(
  "/uploads",
  express.static(path.join(process.cwd(), "src/Features/CV/Router/uploads")),
);

app.use(
  cors({
    origin: "*",
  }),
);

app.use("/api/v1/auth", AuthRouter);
app.use("/api/v1/cv", CVRouter);

app.listen(Port, () => {
  console.log(
    `Listening on port ${Port} successfully http://localhost:${Port}`,
  );
});
