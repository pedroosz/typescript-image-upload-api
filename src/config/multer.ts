import multer from "multer";

export const upload = multer({
  dest: "src/uploads/",
  fileFilter: (req, file, cb) => {
    const FILE_TYPES = /jpeg|jpg|png|gif/;

    if (!FILE_TYPES.test(file.mimetype)) {
      return cb(null, false);
    }

    return cb(null, true);
  },
});
