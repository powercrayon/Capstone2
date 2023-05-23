const Tour = require("../models/Tour");
const bcrypt = require("bcrypt");
const auth = require("../auth");
const jwt = require("jsonwebtoken");

module.exports.createTour = async (req, res) => {
  const userData = auth.decode(req.headers.authorization);

  if (userData.isAdmin) {
    const { tourName, description, price, slots, eventDate } = req.body;

    const newTour = new Tour({
      tourName,
      description,
      price,
      slots,
      eventDate
    });

    try {
      const savedTour = await newTour.save();
      console.log(savedTour);
      res.send(true);
    } catch (error) {
      console.error(error);
      res.send(false);
    }
  } else {
    res.send(false);
  }
};

module.exports.getAllTours = (req,res) => {
  return Tour.find({}).then(result => res.send(result));
}

module.exports.getAllActive = (req, res) => {
  return Tour.find({
    $or: [
      { isActive: true },
      { isActive: { $exists: false } }
    ],
    slots: { $gt: 0 }
  }).then(result => {
    const updatedResult = result.map(avail => {
      if (!avail.hasOwnProperty("isActive")) {
        avail.isActive = true;
      }
      return avail;
    });

    res.send(updatedResult);
  });
};


module.exports.getTour = (req, res) => {
  const tourName = req.params.tourName;

  console.log(tourName);

  return Tour.findOne({ tourName })
    .then(result => {
      if (!result) {
        return res.send({ message: "Tour not found" });
      }
      console.log(result);
      return res.send(result);
    })
    .catch(error => {
      console.log(error);
      return res.send(error);
    });
};

module.exports.updateTour = (req, res) => {
  const tourName = req.params.tourName;
  const updates = req.body;

  if (req.user && req.user.isAdmin) {
    return res.send(true)
  }

  Tour.findByIdAndUpdate(tourName, updates, { new: true })
    .then(updatedTour => {
      if (!updatedTour) {
        return res.send({ message: "Tour not found" });
      }
      return res.send(updatedTour);
    })
    .catch(error => {
      console.log(error);
      return res.send(error);
    });
};

module.exports.archiveTour = (req, res) => {
  const tourId = req.params.tourId;


  Tour.findByIdAndUpdate(tourId, { isActive: false })
  .then(updatedTour => {
    if (!updatedTour) {
      return res.send({ message: "Tour not found" });
    }
    return res.send(updatedTour);
  })
  .catch(error => {
    console.log(error);
    return res.send(error);
  });
};









