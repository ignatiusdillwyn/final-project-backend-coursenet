// routes/ProductRoute.js
const { ProductController } = require("../controllers");
const { authentication, authorization } = require("../middlewares/auth");
const productRouter = require("express").Router();
const multer = require('multer');
const path = require('path');
const fs = require('fs');

// Pastikan folder uploads ada
const uploadDir = path.join(__dirname, '..', 'uploads');
if (!fs.existsSync(uploadDir)) {
  fs.mkdirSync(uploadDir, { recursive: true });
  console.log('Folder uploads created at:', uploadDir);
}

// Konfigurasi multer untuk menyimpan file
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, uploadDir);
  },
  filename: function (req, file, cb) {
    const uniqueName = Date.now() + '-' + Math.round(Math.random() * 1E9) + path.extname(file.originalname);
    cb(null, uniqueName);
  }
});

const fileFilter = (req, file, cb) => {
  const allowedTypes = ['image/jpeg', 'image/jpg', 'image/png'];
  if (allowedTypes.includes(file.mimetype)) {
    cb(null, true);
  } else {
    cb(new Error('Format file tidak didukung. Gunakan JPEG, JPG, atau PNG'), false);
  }
};

const upload = multer({
  storage: storage,
  limits: {
    fileSize: 5 * 1024 * 1024
  },
  fileFilter: fileFilter
});

/**
 * @swagger
 * /api/products/getAll:
 *   get:
 *     summary: Get all products
 *     description: Retrieve all products belonging to the authenticated user
 *     tags:
 *       - Products
 *     security:
 *       - accessToken: []
 *     responses:
 *       201:
 *         description: Success get all products
 *         content:
 *           application/json:
 *             example:
 *               status: 201
 *               message: Get all products successfully
 *               products:
 *                 - id: 1
 *                   name: Panci Presto
 *                   description: Panci presto anti meledak
 *                   price: 78000
 *                   qty: 8
 *                   image: uploads/1234-panci.jpg
 *                   UserId: 1
 *       500:
 *         description: Internal server error
 */
productRouter.get("/getAll", authentication, ProductController.getAllProduct);

/**
 * @swagger
 * /api/products/create:
 *   post:
 *     summary: Create a new product
 *     tags:
 *       - Products
 *     security:
 *       - accessToken: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - name
 *               - description
 *               - price
 *               - qty
 *             properties:
 *               name:
 *                 type: string
 *                 example: Panci Presto MAX
 *               description:
 *                 type: string
 *                 example: Panci presto anti meledak
 *               price:
 *                 type: integer
 *                 example: 78000
 *               qty:
 *                 type: integer
 *                 example: 8
 *     responses:
 *       201:
 *         description: Product created successfully
 *         content:
 *           application/json:
 *             example:
 *               status: 201
 *               message: Product created successfully
 *               data:
 *                 id: 3
 *                 name: Panci Presto MAX
 *                 price: 78000
 *                 qty: 8
 *                 image: ""
 *       400:
 *         description: Validation error
 *       500:
 *         description: Internal server error
 */
productRouter.post("/create", authentication, ProductController.createProduct);

/**
 * @swagger
 * /api/products/delete/{id}:
 *   delete:
 *     summary: Delete product by ID
 *     tags:
 *       - Products
 *     security:
 *       - accessToken: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *         example: 3
 *     responses:
 *       200:
 *         description: Product deleted successfully
 *       404:
 *         description: Product not found
 *       500:
 *         description: Internal server error
 */
productRouter.delete("/delete/:id", authentication, authorization, ProductController.deleteProduct);

/**
 * @swagger
 * /api/products/edit/{id}:
 *   put:
 *     summary: Update product by ID
 *     tags:
 *       - Products
 *     security:
 *       - accessToken: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *         example: 3
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               name:
 *                 type: string
 *                 example: Panci Presto ULTRA
 *               description:
 *                 type: string
 *                 example: Panci presto versi terbaru
 *               price:
 *                 type: integer
 *                 example: 85000
 *               qty:
 *                 type: integer
 *                 example: 10
 *               image:
 *                 type: string
 *                 example: uploads/1234-panci.jpg
 *     responses:
 *       201:
 *         description: Product updated successfully
 *       400:
 *         description: Validation error
 *       404:
 *         description: Product not found
 *       500:
 *         description: Internal server error
 */
productRouter.put("/edit/:id", authentication, authorization, ProductController.updateProduct);

/**
 * @swagger
 * /api/products/product-detail/{id}:
 *   get:
 *     summary: Get product by ID
 *     tags:
 *       - Products
 *     security:
 *       - accessToken: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *         example: 3
 *     responses:
 *       201:
 *         description: Success get product detail
 *         content:
 *           application/json:
 *             example:
 *               status: 201
 *               message: Get product with id 3 successfully
 *               data:
 *                 id: 3
 *                 name: Panci Presto MAX
 *                 description: Panci presto anti meledak
 *                 price: 78000
 *                 qty: 8
 *                 image: uploads/1787715946457-952865897.jpeg
 *       404:
 *         description: Product not found
 *       500:
 *         description: Internal server error
 */
productRouter.get("/product-detail/:id", authentication, ProductController.getProductById);

/**
 * @swagger
 * /api/products/search/{name}:
 *   get:
 *     summary: Search products by name
 *     tags:
 *       - Products
 *     security:
 *       - accessToken: []
 *     parameters:
 *       - in: path
 *         name: name
 *         required: true
 *         schema:
 *           type: string
 *         example: presto
 *     responses:
 *       201:
 *         description: Search result
 *         content:
 *           application/json:
 *             example:
 *               status: 201
 *               products:
 *                 - id: 3
 *                   name: Panci Presto MAX
 *                   price: 78000
 *                   qty: 8
 *       500:
 *         description: Internal server error
 */
productRouter.get("/search/:name", authentication, ProductController.searchProduct);

/**
 * @swagger
 * /api/products/updateProductImage/{id}:
 *   put:
 *     summary: Update product image
 *     description: Upload a new image for a product (replace existing image)
 *     tags:
 *       - Products
 *     security:
 *       - accessToken: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *         example: 3
 *     requestBody:
 *       required: true
 *       content:
 *         multipart/form-data:
 *           schema:
 *             type: object
 *             required:
 *               - image
 *             properties:
 *               image:
 *                 type: string
 *                 format: binary
 *                 description: Image file (JPEG, JPG, PNG, max 5MB)
 *     responses:
 *       200:
 *         description: Product image updated successfully
 *         content:
 *           application/json:
 *             example:
 *               status: 200
 *               message: Gambar produk berhasil diupdate
 *               data:
 *                 id: 3
 *                 name: Panci Presto MAX
 *                 image: uploads/1787718851865-527302627.jpeg
 *                 imageUrl: http://localhost:3000/uploads/1787718851865-527302627.jpeg
 *       400:
 *         description: Bad request - no file or invalid format
 *       404:
 *         description: Product not found or no access
 *       500:
 *         description: Internal server error
 */
productRouter.put('/updateProductImage/:id', authentication, upload.single('image'), ProductController.updateProductImage);

// productRouter.get("/pin", ProductController.subscriberPin);

module.exports = productRouter;