const express = require('express');
const path = require('path');
const app = express();
const port = 3000;
const routes = require('./routes');
const swaggerJSDoc = require("swagger-jsdoc")
const swaggerUi = require("swagger-ui-express")
require('dotenv').config();

const options = {
  definition: {
    openapi: "3.0.0",
    info: {
      title: "Online Shop API",
      version: "1.0.0",
    },
    components: {
      securitySchemes: {
        accessToken: {
          type: "apiKey",
          in: "header",
          name: "access_token"
        }
      }
    }
  },
  apis: ["./routes/*.js"],
};
const swaggerDoc = swaggerJSDoc(options);
app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(swaggerDoc));

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

const cors = require('cors');

app.use(cors()); // Enable CORS for all routes

// SERVE STATIC FILES - INI YANG DITAMBAHKAN!
// Ini akan membuat file di folder uploads bisa diakses via URL
app.use('/uploads', express.static(path.join(__dirname, 'uploads')));

app.use(routes);

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});
