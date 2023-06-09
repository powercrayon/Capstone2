const User = require("../models/User");
const Order = require("../models/Order");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const auth = require("../auth");
const { authenticate, authorizeAdmin } = require('../auth');

module.exports.registerUser = (req, res) => {
  let newUser = new User({
    firstName: req.body.firstName,
    lastName: req.body.lastName,
    email: req.body.email,
    password: bcrypt.hashSync(req.body.password, 10),
    mobileNo: req.body.mobileNo

  });

  return newUser
    .save()
    .then((user) => {
      console.log(user);
      res.send(true);
    })
    .catch((error) => {
      console.log(error);
      res.send(false);
    });
};

module.exports.loginUser = (req, res) => {
  const { email, password } = req.body;

  User.findOne({ email })
    .then((user) => {
      if (!user) {
        return res.send({ message: "No user found" });
      }

      const isPasswordCorrect = bcrypt.compareSync(password, user.password);
      if (!isPasswordCorrect) {
        return res.send({ message: "Incorrect password" });
      }

      const accessToken = generateAccessToken(user);
      return res.send({ accessToken });
    })
    .catch((error) => {
      console.log(error);
      res.send(false);
    });

  function generateAccessToken(user) {
    const payload = {
      id: user._id,
      email: user.email,
      mobileNo: user.mobileNo,
      isAdmin: user.isAdmin
    };

    const token = jwt.sign(payload, "TourBookingAPI");

    return token;
  }
};


module.exports.getUserEmail = (req, res) => {
  const { email } = req.body;
  User.findOne({ email })
    .then(user => {
      if (user) {
        res.json(user);
      } else {
        res.status(404).json({ error: 'User not found' });
      }
    })
    .catch(error => {
      console.log(error);
      res.status(500).json({ error: 'Error occurred' });
    });
};


module.exports.getUserDetails = (req, res) => {
  const { email } = req.body;
  
  User.findOne({ email })
    .then(user => {
      if (user) {
        res.send(user);
      } else {
        res.send({ message: "User not found" });
      }
    })
    .catch(error => {
      console.log(error);
      res.send(error);
    });
};

module.exports.setAdmin = async (req, res) => {
  try {
    const userId = req.params.userId;

    const user = await User.findById(userId);

    if (!user) {
      return res.send({ message: "User not found" });
    }

    user.isAdmin = true;

    const updatedUser = await user.save();

    res.send({ message: "User set as admin", user: updatedUser });

  } catch (error) {
    console.log(error);
    res.send(error);
  }
};


module.exports.getAllUsers = (req, res) => {

    return User.find({}).then(result => res.send(result));
}

module.exports.bookTour = (req, res) => {
  
  const { tourId, userId, date } = req.body;

  
  const booking = {
    tourId,
    userId,
    date,
  };

  res.status(200).json({ message: 'Tour booked successfully', booking });
};

