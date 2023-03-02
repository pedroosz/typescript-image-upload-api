import { Request, Response } from "express";
import { createReadStream, existsSync, readdir } from "fs";
import { unlink } from "fs/promises";

export class UploadController {
  async Store(req: Request, res: Response) {
    const files = req.files as Express.Multer.File[];

    if (!files || files.length == 0) {
      return res.status(400).json({
        message: "File(s) not provided.",
      });
    }

    return res.status(200).json({
      filenames: [...files.map((a) => a.filename)],
    });
  }

  async Delete(req: Request, res: Response) {
    const { id } = req.params;

    if (!id) {
      return res.status(400).json({
        message: "Image id not provided.",
      });
    }

    try {
      if (!existsSync(`src/uploads/${id}`)) {
        return res.status(404).json({
          message: "File not found.",
        });
      }

      unlink(`src/uploads/${id}`)
        .then(() => {
          return res.status(200).json({
            message: "File deleted.",
          });
        })
        .catch((err) => {
          return res.status(500).json({
            message: err.message || "Internal server error.",
          });
        });
    } catch (error) {
      return res.status(500).json({
        message: error.message || "",
      });
    }
  }

  async GetOne(req: Request, res: Response) {
    const { id } = req.params;

    if (!id) {
      return res.status(400).json({
        message: "Image id not provided.",
      });
    }

    try {
      if (!existsSync(`src/uploads/${id}`)) {
        return res.status(404).json({
          message: "File not found.",
        });
      }

      createReadStream(`src/uploads/${id}`).pipe(res);
    } catch (error) {
      return res.status(500).json({
        message: error.message || "Internal server error.",
      });
    }
  }

  async List(req: Request, res: Response) {
    readdir("src/uploads", (err, files) => {
      if (err) {
        return res.status(500).json({
          message: err.message || "Internal server error.",
        });
      }

      res.status(200).json([...files]);
    });
  }
}
