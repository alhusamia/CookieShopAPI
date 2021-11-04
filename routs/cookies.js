const express = require("express");
const {
  cookieList,
  cookieDetail,
  cookieDelete,
  cookieUpdate,
  featchCookie,
} = require("../controllers/cookiesControllers");

//Mini express app
const router = express.Router();

//Middleware having the params
router.param("cookieId", async (req, res, next, cookieId) => {
  const foundCookie = await featchCookie(cookieId, next);
  if (foundCookie) {
    req.cookie = foundCookie;
  } else {
    next({ status: 404, message: "Cookie Not Found" });
  }
  next();
});

router.get("/", cookieList);

router.get("/:cookieId", cookieDetail);

router.delete("/:cookieId", cookieDelete);

router.put("/:cookieId", upload.single("image"), cookieUpdate);

module.exports = router;
