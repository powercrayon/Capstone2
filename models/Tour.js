const mongoose = require('mongoose');

const tourSchema = new mongoose.Schema({
  tourName: {
    type: String,
    required: true
  },
  description: {
    type: String,
    required: true
  },
  price: {
    type: Number,
    required: true
  },
  isActive: {
    type: Boolean,
    required: false
  },
  slots: {
    type: Number,
    required: true
  },
  eventDate: {
    type: Date,
    required: true
  }
});

const Tour = mongoose.model('Tour', tourSchema);

module.exports = Tour;