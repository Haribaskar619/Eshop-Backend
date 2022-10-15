const mongoose = require("mongoose");

const orderSchema = mongoose.Schema({
  productid: { type: Array },
  amount: { type: Number },
  razorpay: {
    orderId: { type: String },
    paymentId: { type: String },
    signature: { type: String },
  },
  userdetails: { type: Object },
  userid: { type: String },
});

const orderModel = mongoose.model("orders", orderSchema);
module.exports = orderModel;
