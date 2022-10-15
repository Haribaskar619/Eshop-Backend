const mongoose = require("mongoose");

const cartSchema = mongoose.Schema({
  productdetails: { type: Object },
  userid: { type: String },
});

const cartModel = mongoose.model("cart", cartSchema);
module.exports = cartModel;
