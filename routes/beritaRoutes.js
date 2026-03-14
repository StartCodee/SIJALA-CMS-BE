const express = require("express");
const router = express.Router();
const berita = require("../controllers/beritaController");
const { beritaUpload } = require("../middleware/upload");

router.get("/", berita.getAllBerita);
router.post("/", beritaUpload.single("thumbnail"), berita.createBerita);
router.patch("/:id", beritaUpload.single("thumbnail"), berita.updateBerita);
router.delete("/:id", berita.deleteBerita);

module.exports = router;