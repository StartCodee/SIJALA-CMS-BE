const db = require("../db");

exports.getAllPublikasi = async (req, res) => {
  try {
    const result = await db.query("SELECT * FROM publikasi ORDER BY date ASC");
    res.json(result.rows);
  } catch (err) {
    res.status(500).json(err.message);
  }
};

exports.createPublikasi = async (req, res) => {
  const { title, author, category, status, date, subjudul, content } = req.body;

  const thumbnail = req.files?.thumbnail
    ? `/uploads/publikasi/${req.files.thumbnail[0].filename}`
    : null;

  const pdf = req.files?.pdf
    ? `/uploads/publikasi/${req.files.pdf[0].filename}`
    : null;

  try {
    const result = await db.query(
      `INSERT INTO publikasi(title,author,category,status,date,subjudul, thumbnail, content, pdf)
       VALUES($1,$2,$3,$4,$5,$6,$7,$8,$9) RETURNING *`,
      [title, author, category, status, date, subjudul, thumbnail, content, pdf]
    );

    res.json(result.rows[0]);
  } catch (err) {
    res.status(500).json(err.message);
  }
};

exports.updatePublikasi = async (req, res) => {

  const { id } = req.params;

  const allowedFields = [
  "title",
  "author",
  "category",
  "status",
  "date",
  "subjudul",
  "thumbnail",
  "content",
  "pdf"
];

const fields = Object.keys(req.body)
  .filter(key => allowedFields.includes(key))
  .reduce((obj, key) => {
    obj[key] = req.body[key];
    return obj;
  }, {});

  if (req.files?.thumbnail) {
    fields.thumbnail = `/uploads/publikasi/${req.files.thumbnail[0].filename}`;
  }

  if (req.files?.pdf) {
    fields.pdf = `/uploads/publikasi/${req.files.pdf[0].filename}`;
  }


  try {

    const keys = Object.keys(fields);

    if (keys.length === 0) {
      return res.status(400).json({ message: "Tidak ada data untuk diupdate" });
    }

    const setClause = keys
      .map((key, index) => `${key}=$${index + 1}`)
      .join(", ");

    const values = Object.values(fields);

    const query = `
      UPDATE publikasi
      SET ${setClause}
      WHERE id=$${keys.length + 1}
      RETURNING *
    `;

    const result = await db.query(query, [...values, id]);

    if (result.rows.length === 0) {
      return res.status(404).json({ message: "Publikasi tidak ditemukan" });
    }

    res.json(result.rows[0]);

  } catch (err) {
    res.status(500).json(err.message);
  }

};

exports.deletePublikasi = async (req, res) => {
  const { id } = req.params;

  try {
    await db.query("DELETE FROM publikasi WHERE id=$1", [id]);
    res.json({ message: "deleted" });
  } catch (err) {
    res.status(500).json(err.message);
  }
};