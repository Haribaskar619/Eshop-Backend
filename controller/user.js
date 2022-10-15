const { json } = require("body-parser");
const registrationModel = require("../models/user")
const bcrypt = require('bcryptjs');
const jwt = require("jsonwebtoken");
const { use } = require("passport");
const cookieParser = require('cookie-parser')



const register = async (req , res) => {
  console.log(req);
    try {
       const userDatas = new registrationModel({
        firstname:req.body.firstname,
        lastname : req.body.lastname,
        email : req.body.email,
        password : req.body.password,
       })

       userDatas.password = bcrypt.hashSync(userDatas.password , 10);
       
      
       const token = jwt.sign(
        {email : req.body.email},
        process.env.TOKEN_KEY,
        { expiresIn: 60 * 60 });
      userDatas.token = token;
      const createData = await userDatas.save();
       if(createData){
        res.json(createData);
       }
    } catch (error) {
        console.log(error.message);
       res.json({'err':error.message});
    //    res.send({ error: err });
    // throw new error(error.message);
    }
}

const login = async (req, res) => {
    try {
        const user = await registrationModel.find({ email: req.body.email});
        console.log(user);
        console.log(req.body.isAdmin);
        console.log(req.headers["Authorization"]);
        if (user && user.length > 0 ) {
          if (req.body.isAdmin !== user[0].isAdmin){
           return  res.json("User is not admin , Please try again")
          }
          bcrypt.compare(
            req.body.password,
            user[0].password,
            async function (err, result) {
              if (result) {
                const token = jwt.sign(
                    {email : req.body.email,
                    },
                    process.env.TOKEN_KEY,
                    { expiresIn: 60 * 60 }); 
                  user[0].token = token; 
                  console.log(token,user);
              return res.status(200).json(user).cookie();
              } else {
               console.log(" error:username and password doesnt match")
               return res.json("Invalid Credentials");
              }
            }
          );
        }else {
            console.log('Unauthorized Login Attempt')
           return res.json("Unauthorized Login , Please try again")
        }
      } catch (err) {
        res.send(err);
      }
    
}

const welcome = async (req , res) => {
  console.log("hioio")
    try {
        res.status(200).send("Welcome 🙌 ");
    } catch (error) {
       res.status(401).send("Invalid Token");
    }
}

const googleRedirect = async (req, res) => {
 
  console.log(req.user,"hioi")
  let user = {
    firstname: req.user._json.given_name,
    lastname: req.user._json.family_name,
    email: req.user._json.email,
    password: "" ,
   isAdmin:false}
console.log(user,"firstuser")
 const finalUserData = await FindOrCreate(user)
 console.log(finalUserData , "final")
 return finalUserData;


}
async function FindOrCreate(user){
  console.log("find")
  var flag = await CheckUser(user)
  console.log(flag,"flag")
  console.log(user,"user")
  if(flag){  // if user exists then return user
    const token = jwt.sign(
      {email : user.email},
      process.env.TOKEN_KEY,
      { expiresIn: 60 * 60 });
      user.token = token
      return user 
  } else {
    const userDatas = new registrationModel({
      firstname: user.firstname,
      lastname : user.lastname,
      email : user.email,
     })
     const token = jwt.sign(
      {email : user.email},
      process.env.TOKEN_KEY,
      { expiresIn: 60 * 60 });
    userDatas.token = token;
    const createData = await userDatas.save();
    console.log("createData",createData)
      return createData;
  }
}
async function CheckUser(user){
 const checkUser = await registrationModel.find({email : user.email})
if(checkUser.length>0){
return true
}else {
  return false
}
}

module.exports = {register , login, welcome,googleRedirect};