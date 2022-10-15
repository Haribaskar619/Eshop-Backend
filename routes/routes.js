const { Router } = require("express");
const express = require("express");
const { addToCart } = require("../controller/cart");
const user = require("../controller/user");
const router = express.Router();
const auth = require("../middleware/auth");
const cart = require("../controller/cart");
const orders = require("../controller/orders");
const products = require("../controller/products")
const passport = require('passport')
const app = express();






router.route("/register").post(user.register);
router.route("/login").post(user.login);



// router.use(
//    auth.verifyToken
//   );

// router.route('/welcome').get(user.welcome);

router.route("/cartitems").post(cart.addToCart);
router.route("/cartitems").get(cart.getCartItems);
router.route("/cartitems/:id").delete(cart.delCartItems);
router.route("/get-razorpay-key").get(orders.razorpayKey);
router.route("/create-order").post(orders.createOrder);
router.route("/pay-order").post(orders.orderDetails);
router.route("/order-list").get(orders.myOrders);
router.route("/cartitems").delete(cart.delAllCartItems);
router.route("/addproductdata").post(products.addNewProduct);
router.route("/getproductdata").get(products.getProductData);
router.route("/getproddata/:id").get(products.getProdData);
router.route("/delproductdata/:id").delete(products.deleteProductData);
router.route("/updateproductdata/:id").put(products.updateProductDetail);


module.exports = router;
