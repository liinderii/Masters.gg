import multer from "multer";

export const uploadVideo = multer({
  storage: multer.memoryStorage(),
  // videofiler blir större, börja med t.ex. 100MB
  limits: { fileSize: 100 * 1024 * 1024 },
  fileFilter: (_req, file, cb) => {
    if (!file.mimetype.startsWith("video/")) {
      return cb(new Error("Only video files allowed"));
    }
    cb(null, true);
  },
});
