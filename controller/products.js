const productModel = require("../models/products")

// const multer = require ('multer')

// const fileStorageEngine = multer.diskStorage({
//     destination: (req,file,cb) => {
//         cb(null, './images')
//     },
//     filename: (req,file,cb) => {
//         cb(null, file.fieldname + '-' + Date.now());
//     },
// })
// const upload = multer({storage: fileStorageEngine});

const addNewProduct = async (req,res) => {
    try {
        const productData = new productModel({
            category: req.body.category,
            description: req.body.description,
            image: req.body.image,
            price: req.body.price,
            rating: {
                count:req.body.count,
                rate: req.body.rate,
            },
            title:req.body.title,
        })
       
        const finalProductData = await productData.save();
        console.log(finalProductData)
        res.json(finalProductData)
    } catch (error) {
        console.log(error);
        res.json("Something went wrong")
    }
}

const getProductData = async (req,res) => {
    try {
       const productDetails = await productModel.find(); 
       res.json(productDetails);
    } catch (error) {
        console.log(error);
        res.json("Something went wrong")
    }
}
const getProdData = async (req, res) => {
    try {
      const prodData = await productModel.findById(req.params.id);
  
      if (prodData) {
        res.json(prodData);
      }
    } catch (error) {
      console.log(error);
    }
  };


const deleteProductData = async (req,res) => {
    try {
         await productModel.findByIdAndDelete(req.params.id);
        res.json("Successfully deleted from Database")
    } catch (error) {
        console.log(error);
        res.json("Something went wrong")
    }
}


const updateProductDetail = async (req,res) => {
    try {
        const  updateDetail = await productModel.findByIdAndUpdate(
            req.params.id,
            req.body);
            
        if(updateDetail){
            console.log("Updated Successfully")
        }
    } catch (error) {
        console.log(error);
        res.json("Something went wrong")
    }
}

module.exports = {addNewProduct,getProductData, deleteProductData,updateProductDetail,getProdData}