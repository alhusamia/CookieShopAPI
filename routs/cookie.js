const express = require("express");
const upload = require("../middleware/multer");
const {
  cookieList,
  cookieDetail,
  cookieDelete,
  cookieUpdate,
  featchCookie,
} = require("../controllers/cookiesControllers");
const passport = require("passport");

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

router.get("/", passport.authenticate("jwt", { session: false }), cookieList); // we add the jwtStrategy where you need your rout to be login

router.get("/:cookieId", cookieDetail);

router.delete(
  "/:cookieId",
  passport.authenticate("jwt", { session: false }),
  cookieDelete
);

router.put("/:cookieId", upload.single("image"), cookieUpdate);

module.exports = router;
