const express = require("express");
const router = express.Router();
const UsersContoller = require("../controllers/UsersContoller");

router.post("/login", UsersContoller.loginUser);
router.post("/register", UsersContoller.registerUser);

module.exports = router;
