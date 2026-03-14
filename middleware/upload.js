const multer = require("multer");
const path = require("path");
const fs = require("fs");

const createStorage = (folder) => {

  const uploadPath = `uploads/${folder}`;

  if (!fs.existsSync(uploadPath)) {
    fs.mkdirSync(uploadPath, { recursive: true });
  }

  return multer.diskStorage({
    destination: (req, file, cb) => {
      cb(null, uploadPath);
    },

    filename: (req, file, cb) => {

      const unique =
        Date.now() + "-" + Math.round(Math.random() * 1e9);

      cb(null, unique + path.extname(file.originalname));

    }
  });
};

const imageFilter = (req, file, cb) => {

  const allowed = ["image/jpeg","image/png","image/webp"];

  if (allowed.includes(file.mimetype)) {
    cb(null, true);
  } else {
    cb(new Error("Only image files allowed"), false);
  }

};

const pdfFilter = (req, file, cb) => {

  if (file.mimetype === "application/pdf") {
    cb(null, true);
  } else {
    cb(new Error("Only PDF allowed"), false);
  }

};

module.exports = {
  beritaUpload: multer({
    storage: createStorage("berita"),
    fileFilter: imageFilter,
    limits: { fileSize: 5 * 1024 * 1024 }
  }),

  kegiatanUpload: multer({
    storage: createStorage("kegiatan"),
    fileFilter: imageFilter,
    limits: { fileSize: 5 * 1024 * 1024 }
  }),

  publikasiUpload: multer({
    storage: createStorage("publikasi"),
    limits: { fileSize: 10 * 1024 * 1024 }
  })
};