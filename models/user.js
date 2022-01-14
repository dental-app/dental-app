const mongoose = require("mongoose");
const Schema = mongoose.Schema;

//Create Schema
const UserSchema = new Schema({
  fullname: {
    type: String,
    required: true,
  },
  cin: {
    type: Number,
    required: true,
  },
  town: {
    type: String,
    required: true,
  },
  adress: {
    type: String,
    required: true,
  },
  postalCode: {
    type: Number,
    required: true,
  },
  cellphone: {
    type: Number,
    required: true,
  },
  date: {
    type: Date,
    required: true,
  },
  maturity: {
    type: String,
    required: true,
  },
  sex: {
    type: String,
    required: true,
  },
  civility: {
    type: String,
    required: true,
  },
  description: {
    type: String,
    required: true,
  },
});

module.exports = User = mongoose.model("user", UserSchema);
