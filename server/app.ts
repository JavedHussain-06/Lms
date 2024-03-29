require("dotenv").config();
import express, { NextFunction, Request, Response } from "express";
export const app = express();
import cookieParser from "cookie-parser";
import cors from "cors";
import { ErrorHandleMiddleware } from "./middleware/error";
import userRouter from "./routes/user.routes";

// cookieParser
app.use(cookieParser());


// cors
app.use(
  cors({
    origin: process.env.ORIGIN,
  })
);

app.use(express.json({ limit: "50mb" }));
app.use(express.urlencoded({ limit: "50mb", extended: true }));

// routes

app.use("/api/v1", userRouter)


// api testing

app.get("/test", (req: Request, res: Response, next: NextFunction) => {
  res.status(200).json({
    success: true,
    message: "Api is working",
  });
});

// unknown routes
app.all("*", (req: Request, res: Response, next: NextFunction) => {
  res.status(404).json({
    success: false,
    message: "Route not found",
  });

  const err = new Error(`Route ${req.originalUrl} not found}`) as any;
  err.statusCode = 404;
});

app.use(ErrorHandleMiddleware);
