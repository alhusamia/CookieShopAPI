const express = require("express");
const {
  cookieCreate,
  cookieList,
  cookieDetail,
  cookieDelete,
  cookieUpdate,
} = require("../controllers/cookiesControllers");

//Mini express app
const router = express.Router();

router.get("/", cookieList);

router.get("/:cookieId", cookieDetail);

router.post("/", cookieCreate);

router.delete("/:cookieId", cookieDelete);

router.put("/:cookieId", cookieUpdate);

module.exports = router;
