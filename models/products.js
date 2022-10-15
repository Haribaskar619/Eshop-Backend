const mongoose = require("mongoose");

const addProducts = mongoose.Schema({
    category: {type: String},
    description: {type:String},
    image: {type : String
        // data : {type: Buffer},
        // contenttype : {type: String},
    },
    price: {type: Number},
    rating: {
        count:{type:Number},
        rate: {type:Number},
    },
    title:{type: String},
})

const productModel = mongoose.model("Products",addProducts);

module.exports= productModel;