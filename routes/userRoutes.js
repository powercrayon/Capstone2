const express = require("express");
const router = express.Router();
const userController = require("../controllers/userController");
const auth = require("../auth");


router.post("/register", userController.registerUser);

router.post("/login", userController.loginUser);

router.post("/checkEmail", userController.getUserEmail);

router.get("/:userId", auth.verify, userController.getUserDetails);

router.put("/setAdmin/:userId", auth.verify , userController.setAdmin);

router.post("/details",  userController.getAllUsers);

router.post("/book", userController.bookTour);

module.exports = router;