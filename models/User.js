const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
  email: {
    type: String,
    required: [true, "Email is required"]
  },
  password: {
    type: String,
    required: [true, "Password is required"]
  },
  isAdmin: {
    type: Boolean,
    default: false
  },
  mobileNo: {
    type: Number,
    required: [true, "Mobile No is required"]
  },
  isActive: {
    type: Boolean,
    default: true
  },
    orders: [{
    type: mongoose.Schema.Types.ObjectId,
    ref: "Order"
  }]
  // order: [
  //   {
  //     tours: [
  //       {
  //         toursName: {
  //           type: String,
  //           required: [true, "Product name is required"]
  //         },
  //         quantity: {
  //           type: Number,
  //           required: [true, "Quantity is required"]
  //         },
  //         purchasedOn: {
  //           type: Date,
  //           default: Date.now
  //         }
  //       }
  //     ]
  //   }
  //]
});

module.exports = mongoose.model("User", userSchema);