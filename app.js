const express = require('express');
const path = require('path'); // ← HARUS ADA ini
const app = express();
const port = 3000;
const routes = require('./routes');

app.use(express.json()); // ← HARUS ADA ini
app.use(express.urlencoded({ extended: true })); // ← Untuk form data

const cors = require('cors');

// Untuk mengizinkan semua origin
app.use(cors());

// SERVE STATIC FILES - INI YANG DITAMBAHKAN!
// Ini akan membuat file di folder uploads bisa diakses via URL
app.use('/uploads', express.static(path.join(__dirname, 'uploads')));

app.use(routes);

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});