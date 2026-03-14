const express = require("express");
const router = express.Router();
const publikasi = require("../controllers/publikasiController");
const { publikasiUpload } = require("../middleware/upload");

router.get("/", publikasi.getAllPublikasi);
router.post("/", publikasiUpload.single("thumbnail"), publikasi.createPublikasi);
router.patch("/:id", publikasiUpload.single("thumbnail"), publikasi.updatePublikasi);
router.delete("/:id", publikasi.deletePublikasi);

module.exports = router;