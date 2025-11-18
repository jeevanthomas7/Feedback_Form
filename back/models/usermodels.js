const mongoose = require('mongoose');

const schema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, "Name is required"],
    trim: true,
    minlength: [2, "Name must be at least 2 characters long"]
  },

  email: {
    type: String,
    required: [true, "Email is required"],
    trim: true,
    lowercase: true,
    match: [
      /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/,
      "Please enter a valid email"
    ]
  },

  message: {
    type: String,
    required: [true, "Message is required"],
    minlength: [5, "Message must be at least 5 characters long"]
  },

  rating: {
    type: Number,
    required: [true, "Rating is required"],
    min: [1, "Minimum rating is 1"],
    max: [5, "Maximum rating is 5"]
  },
},
{timestamps:true});

module.exports = mongoose.model("Feedback", schema);
