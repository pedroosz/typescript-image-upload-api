import { Router } from "express";
import { UploadsRouter } from "./upload.routes";

export const apiRouter = Router();

apiRouter.use("/uploads", UploadsRouter);
