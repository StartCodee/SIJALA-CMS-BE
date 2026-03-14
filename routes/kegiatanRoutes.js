const express = require("express");
const router = express.Router();
const kegiatan = require("../controllers/kegiatanController");
const { kegiatanUpload } = require("../middleware/upload");

router.get("/", kegiatan.getAllKegiatan);
router.post("/", kegiatanUpload.single("thumbnail"), kegiatan.createKegiatan);
router.patch("/:id", kegiatanUpload.single("thumbnail"), kegiatan.updateKegiatan);
router.delete("/:id", kegiatan.deleteKegiatan);

module.exports = router;