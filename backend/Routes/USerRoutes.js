const express = require("express");
const router = express.Router();
const {
  userSignup,
  userLogin,
  test,
  logout,
  cookieValidation,
} = require("../Controllers/UserControllers");

router.post("/usersignup", userSignup);
router.post("/userlogin", userLogin);
router.get("/test", cookieValidation, test);
router.get("/userlogout", cookieValidation, logout);

module.exports = router;
