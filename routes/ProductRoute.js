const { ProductController } = require("../controllers");
const { authentication, authorization } = require("../middlewares/auth");
const productRouter = require("express").Router();

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
  "/details/:id",
  // authentication,

  ProductController.getProductById
);
productRouter.get(
  "/search/:name", 
  authentication,
  // authorization,
  ProductController.searchProduct
);

module.exports = productRouter;