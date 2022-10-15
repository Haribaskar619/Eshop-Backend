const cartModel = require("../models/cart");

const addToCart = async (req, res) => {
  console.log(req.body.productdetails);
  try {
    const cartItems = new cartModel({
      productdetails: req.body.productdetails,
      userid: req.body.userid,
    });
    console.log(cartItems);
    const addedItems = await cartItems.save();
    if (addedItems) {
      res.json(addedItems);
      console.log(addedItems);
    }
  } catch (error) {
    console.log(error.message);
    res.json({ err: error.message });
  }
};

const getCartItems = async (req, res) => {
  try {
    const cartItems = await cartModel.find({ userid: req.query.userid }).exec();

    res.json(cartItems);
  } catch (error) {
    console.log(error);
    res.json("error");
  }
};

const delCartItems = async (req, res) => {
  try {
    const deletedItem = await cartModel.findByIdAndDelete(req.params.id);

    res.json(deletedItem);
  } catch (error) {
    console.log(error);
    res.json("error");
  }
};

const delAllCartItems = async (req, res) => {
  try {
    const emptyCart = await cartModel.deleteMany();
    res.json("cart cleared");
  } catch (error) {
    console.log(error);
    res.json("error");
  }
};
module.exports = { addToCart, getCartItems, delCartItems, delAllCartItems };
