// const express = require('express')
// const app = express()
// const port = 3000
// const routes = require('./routes')

// app.use(express.json()); 
// app.use(express.urlencoded({ extended: true })); 

// const cors = require('cors');

// app.use(cors()); // Enable CORS for all routes

// // --- UBAH BAGIAN INI ---
// // Ganti 'http://localhost:5173' menjadi domain hosting Anda
// // Pastikan Anda menambahkan 'https://' di depannya.
// // app.use(cors({
// //   origin: 'https://toko-pak-edi.dillwyn.my.id' 
// // }));

// app.use(routes)

// app.listen(port, () => {
//   console.log(`Example app listening on port ${port}`)
// })

const express = require('express')
const app = express()
const port = 3000
const routes = require('./routes')
const cors = require('cors');

app.use(express.json()); 
app.use(express.urlencoded({ extended: true })); 

// --- PERBAIKAN CORS ---
// Hanya gunakan SATU konfigurasi CORS
const allowedOrigins = [
  'https://toko-pak-edi.dillwyn.my.id',
  'http://localhost:5173', // untuk development
  'http://localhost:3000'  // untuk testing local
];

app.use(cors({
  origin: function (origin, callback) {
    // Allow requests with no origin (like mobile apps or curl requests)
    if (!origin) return callback(null, true);
    
    if (allowedOrigins.indexOf(origin) !== -1) {
      callback(null, true);
    } else {
      console.log('Blocked origin:', origin); // Untuk debugging
      callback(new Error('Not allowed by CORS'));
    }
  },
  credentials: true, // Jika pakai cookies/session
  methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
  allowedHeaders: ['Content-Type', 'Authorization']
}));

// HAPUS app.use(cors()) yang sebelumnya

app.use(routes)

app.listen(port, '0.0.0.0', () => {
  console.log(`Server running on port ${port}`)
  console.log(`Allowed origins:`, allowedOrigins)
})