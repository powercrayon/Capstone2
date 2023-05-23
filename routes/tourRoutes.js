const express = require('express');
const router = express.Router();
const tourController = require("../controllers/tourController");
const auth = require("../auth");

router.post("/createTour",  tourController.createTour);
router.post("/allTours", tourController.getAllTours);
router.get("/", tourController.getAllActive);
router.get("/:tourName", tourController.getTour);
router.put("/:tourName", auth.verify, tourController.updateTour);
router.put("/:tourId/archive", auth.verify, tourController.archiveTour);
  

module.exports = router;