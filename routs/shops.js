const express = require("express");
const upload = require("../middleware/multer");
const {
  shopCreate,
  ShopList,
  shopDetail,
  shopDelete,
  shopUpdate,
  featchShop,
  cookieCreate,
} = require("../controllers/shopsControllers");

//Mini express app
const router = express.Router();

//Middleware having the params
router.param("shopId", async (req, res, next, shopId) => {
  const foundShop = await featchShop(shopId, next);
  if (foundShop) {
    req.shop = foundShop;
  } else {
    next({ status: 404, message: "Shop Not Found" });
  }
  next();
});

router.get("/", ShopList);

router.get("/:shopId", shopDetail);

router.post("/", upload.single("image"), shopCreate);

router.post("/:shopId/cookie", upload.single("image"), cookieCreate);

router.delete("/:shopId", shopDelete);

router.put("/:shopId", upload.single("image"), shopUpdate);

module.exports = router;
