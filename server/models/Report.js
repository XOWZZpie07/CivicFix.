const mongoose = require("mongoose");

const reportSchema = new mongoose.Schema({
  issueType: {
    type: String,
    required: true
  },

  description: {
    type: String,
    required: true
  },

  issueDate: {
    type: Date
  },

  state: {
    type: String
  },

  district: {
    type: String
  },

  area: {
    type: String
  },

  street: {
    type: String
  },

  image: {
    type: String,
    default: ""
  },

  longitude: {
    type: Number
  },

  latitude: {
    type: Number
  },

  status: {
    type: String,
    default: "Pending"
  }
});

const Report = mongoose.model("Report", reportSchema);

module.exports = Report;