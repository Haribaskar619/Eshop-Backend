const orderModel = require("../models/orders");
const dotenv = require("dotenv");
const Razorpay = require("razorpay");
dotenv.config();

const razorpayInstance = new Razorpay({
  key_id: "rzp_test_gGRLkIpQNCXJoE",
  key_secret: "DdYFTdaUp8Kmm0Ekp63W0ELG",
});


const razorpayKey = (req, res) => {
  try {
    res.send({ key: process.env.RAZORPAY_KEY_ID });
  } catch (error) {
    res.send(error);
  }
};


const createOrder = async (req, res) => {
  try {
    const { amount, currency } = req.body;
    razorpayInstance.orders.create({ amount, currency }, (err, order) => {
      if (!err) {
        res.json(order);
        console.log(order);
      } else res.send(err);
    });
  } catch (error) {
    res.send("something went wrong");
  }
};


const orderDetails = async (req, res) => {
  try {
    const orderItem = new orderModel({
      productid: req.body.productid,
      amount: req.body.amount,
      razorpay: {
        orderId: req.body.razorpayOrderId,
        paymentId: req.body.razorpayPaymentId,
        signature: req.body.razorpaySignature,
      },
      userdetails: req.body.userdetails,
      userid: req.body.userid,
    });
    const finalOrder = await orderItem.save();
    if (finalOrder) {
      res.json(finalOrder);
      console.log(finalOrder);
    }
  } catch (error) {
    console.log(error.message);
    res.json({ err: error.message });
    res.status(500).send(error);
  }
};

const myOrders = async (req, res) => {
  try {
    console.log(req.query.userid);
    const ordersList = await orderModel
      .find({ userid: req.query.userid })
      .exec();
    res.json(ordersList);
    console.log(ordersList);
  } catch (error) {
    res.json("Something Went Wrong");
    console.log("something went wrong");
  }
};

module.exports = { orderDetails, myOrders, createOrder, razorpayKey };
