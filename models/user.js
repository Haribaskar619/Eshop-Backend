const mongoose = require("mongoose");

const registrationSchema = mongoose.Schema({
  firstname: { type: String },
  lastname: { type: String },
  email: {
    type: String,
    trim: true,
    lowercase: true,
    unique: true,
    required: "Email address is requireddddddd",
  },
  password: { type: String },
  token: { type: String },
  isAdmin: {
    type: Boolean,
    require:true,
    default:false,
  },
  created: {
    type: Date,
    default: Date.now
  }
});

const registrationModel = mongoose.model("user", registrationSchema);

module.exports = registrationModel;
