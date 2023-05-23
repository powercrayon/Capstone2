const express = require('express');
const router = express.Router();
const orderController = require("../controllers/orderController");
const auth = require("../auth")

router.post("/checkout", auth.verify , orderController.checkout);

router.post("/orders", auth.verify, orderController.getAuthenticatedUserOrders);

router.get("/", auth.verify, orderController.getAllOrders);

module.exports = router;