const Order = require("../models/Order");
const bcrypt = require("bcrypt");
const auth = require("../auth");
const User = require("../models/User");
const Tour = require("../models/Tour");
const jwt = require("jsonwebtoken");


module.exports.checkout = async (req, res) => {
  const { tourId, userId, quantity } = req.body;

  try {
    const tour = await Tour.findById(tourId);
    if (!tour) {
      return res.send({ message: 'Tour not found' });
    }

    if (req.user && !req.user.isAdmin) {
      await handleUserCheckout(tour, userId, quantity, res);
    } else {
      return res.send({ auth: "failed", message: "Admin access denied" });
    }
  } catch (error) {
    console.log(error);
    res.send(error);
  }
};

const handleUserCheckout = (tour, userId, quantity, res) => {
  const totalPrice = tour.price * quantity;
  const order = new Order({
    userId,
    tourId: tour._id,
    quantity,
    totalPrice,
  });

  order.save()
    .then(savedOrder => {
      User.findByIdAndUpdate(userId, { $push: { orders: savedOrder._id } })
        .then(() => {
          res.send({ order: savedOrder });
        })
        .catch(error => {
          console.log(error);
          res.send(error);
        });
    })
    .catch(error => {
      console.log(error);
      res.send(error);
    });
};

module.exports.getAuthenticatedUserOrders = async (req, res) => {
  try {
    const email = req.user.email;

    const orders = await Order.find({ email });

    res.send({ orders });
  } catch (error) {
    console.log(error);
    res.send({ message: "Error retrieving user orders" });
  }
};

module.exports.getAllOrders = async (req, res) => {
  try {
    const orders = await Order.find();
    res.send({ orders });
  } catch (error) {
    console.log(error);
    res.send(error);
  }
};