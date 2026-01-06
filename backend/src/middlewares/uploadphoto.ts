import multer from "multer";

export const uploadPhoto = multer({
  storage: multer.memoryStorage(), // vi skriver till GridFS direkt från RAM
  limits: { fileSize: 8 * 1024 * 1024 }, // 8MB
  fileFilter: (_req, file, cb) => {
    if (!file.mimetype.startsWith("image/")) {
      return cb(new Error("Only image files allowed"));
    }
    cb(null, true);
  },
});
