import { Router } from "express";
import { upload } from "../config/multer";
import { UploadController } from "../controllers/upload.controller";

export const UploadsRouter = Router();

const Controller = new UploadController();

UploadsRouter.get("/:id", Controller.GetOne);
UploadsRouter.delete("/:id", Controller.Delete);

UploadsRouter.post("/", upload.array("files"), Controller.Store);
UploadsRouter.get("/", Controller.List);
