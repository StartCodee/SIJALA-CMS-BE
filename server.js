const express = require("express");
const cors = require("cors");
require("dotenv").config();

const beritaRoutes = require("./routes/beritaRoutes");
const publikasiRoutes = require("./routes/publikasiRoutes");
const kegiatanRoutes = require("./routes/kegiatanRoutes");

const app = express();

app.use(cors());
app.use(express.json());

app.use("/api/berita", beritaRoutes);
app.use("/api/publikasi", publikasiRoutes);
app.use("/api/kegiatan", kegiatanRoutes);
app.use("/uploads", express.static("uploads"));

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});