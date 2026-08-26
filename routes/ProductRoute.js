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
    cb(null, uploadDir); // Gunakan path absolut
  },
  filename: function (req, file, cb) {
    // Nama file: timestamp + random + extension
    const uniqueName = Date.now() + '-' + Math.round(Math.random() * 1E9) + path.extname(file.originalname);
    cb(null, uniqueName);
  }
});

// Filter file
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
    fileSize: 5 * 1024 * 1024 // 5MB
  },
  fileFilter: fileFilter
});

productRouter.get("/getAll", authentication, ProductController.getAllProduct);
productRouter.post(
  "/create",
  authentication,
  ProductController.createProduct
);
productRouter.delete(
  "/delete/:id",
  authentication,
  authorization,
  ProductController.deleteProduct
);
productRouter.put(
  "/edit/:id",
  authentication,
  authorization,
  ProductController.updateProduct
);
productRouter.get(
  "/product-detail/:id",
  authentication,
  ProductController.getProductById
);
productRouter.get(
  "/search/:name",
  authentication,
  // authorization,
  ProductController.searchProduct
);

productRouter.put(
  '/updateProductImage/:id',
  authentication,
  upload.single('image'),
  ProductController.updateProductImage
);

productRouter.get(
  "/pin",
  // authentication,
  // authorization,
  ProductController.subscriberPin
);

module.exports = productRouter;