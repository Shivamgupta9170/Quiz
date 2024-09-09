const router = require("express").Router();
const authControllers = require("../controllers/authcontroller");
const { registerValidator,otpMailValidator, loginValidator,verifyOtpValidator} = require("../helpers/validator");

// Unprotected routes: registration and login
router.post("/register", registerValidator, authControllers.registerUser);
router.post("/login", loginValidator, authControllers.loginUser);


router.post("/sendOtp",otpMailValidator,authControllers.sendOtp);
router.post("/verifyOtp",verifyOtpValidator,authControllers.verifyOtp);
module.exports = router;
