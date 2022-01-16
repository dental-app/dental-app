const mongoose = require("mongoose");
const Schema = mongoose.Schema;

//Create Schema
const AppointmentSchema = new Schema({
  fullname: {
    type: String,
    required: true,
  },
  cellphone: {
    type: String,
    required: true,
  },
  date: {
    type: String,
    required: true,
  },
  price: {
    type: Number,
    required: true,
  },
  time: {
    type: String,
    required: true,
  },
  description: {
    type: String,
    required: true,
  },
  rest: {
    type: Number,
    default: 0,
  },
});

module.exports = Appointment = mongoose.model("appointment", AppointmentSchema);
