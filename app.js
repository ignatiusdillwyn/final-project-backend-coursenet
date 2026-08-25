const express = require('express')
const app = express()
const port = 3000
const routes = require('./routes')

app.use(express.json()); 
app.use(express.urlencoded({ extended: true })); 

const cors = require('cors');

app.use(cors()); // Enable CORS for all routes

// --- UBAH BAGIAN INI ---
// Ganti 'http://localhost:5173' menjadi domain hosting Anda
// Pastikan Anda menambahkan 'https://' di depannya.
// app.use(cors({
//   origin: 'https://toko-pak-edi.dillwyn.my.id' 
// }));

app.use(routes)

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})

