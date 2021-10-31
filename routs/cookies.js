const express = require("express");
const {
  cookieCreate,
  cookieList,
  cookieDetail,
  cookieDelete,
} = require("../controllers/cookiesControllers");

//Mini express app
const router = express.Router();

router.get("/", cookieList);

router.get("/:cookieId", cookieDetail);

router.post("/", cookieCreate);

router.delete("/:cookieId", cookieDelete);

module.exports = router;
