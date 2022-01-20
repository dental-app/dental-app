const mongoose = require("mongoose");
const Schema = mongoose.Schema;

//Create Schema
const UserSchema = new Schema({
  fullname: {
    type: String,
  },
  cin: {
    type: Number,
  },
  town: {
    type: String,
  },
  adress: {
    type: String,
  },
  postalCode: {
    type: Number,
  },
  cellphone: {
    type: Number,
  },
  date: {
    type: Date,
  },
  maturity: {
    type: String,
  },
  sex: {
    type: String,
  },
  civility: {
    type: String,
  },
  data: {
    type: String,
  },
  description: {
    type: String,
  },
  appointments: [{ type: mongoose.Schema.Types.ObjectId, ref: "appointment" }],
});

module.exports = User = mongoose.model("user", UserSchema);
