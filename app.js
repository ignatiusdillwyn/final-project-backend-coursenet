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
// Atau bisa juga dengan:
// app.use(express.static('uploads'));

// Atau untuk mengizinkan origin tertentu
// app.use(cors({
//   origin: 'http://localhost:5173', // Frontend origin
//   // credentials: true // Jika menggunakan cookies/auth
// }));

app.use(routes);

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});