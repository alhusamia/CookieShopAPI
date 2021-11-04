const express = require("express");
const {
  shopCreate,
  shopList,
  shopDetail,
  shopDelete,
  shopUpdate,
  featchShop,
} = require("../controllers/shopsControllers");

const { cookieCreate } = require("../controllers/cookiesControllers");

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

router.get("/", shopList);

router.get("/:shopId", shopDetail);

router.post("/", upload.single("image"), shopCreate);

router.post("/:shopId/cookie", upload.single("image"), cookieCreate);

router.delete("/:shopId", shopDelete);

router.put("/:shopId", upload.single("image"), shopUpdate);

module.exports = router;
