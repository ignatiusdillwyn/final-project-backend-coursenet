const router = require("express").Router();
const base = "api";

router.get(`/${base}`, (req, res) => {
  res.json({ message: "WEB API" });
});

const productRouters = require("./ProductRoute");
const userRouters = require("./UserRoute");

router.use(`/${base}/products`, productRouters);
router.use(`/${base}/users`, userRouters);

module.exports = router;
