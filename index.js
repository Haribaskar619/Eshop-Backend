// Importing required pacakages;
const express = require('express');
const cors = require('cors');
const passport = require('passport')
const mongoose = require('mongoose');
const router = require('./routes/routes');
const dotenv = require('dotenv').config()
const multer = require ('multer')
const GoogleStrategy = require('passport-google-oauth20').Strategy;
const jwt = require('jsonwebtoken')
const cookieParser = require('cookie-parser')
const session = require('express-session');
const { googleRedirect } = require('./controller/user');


const app = express();

const fileStorageEngine = multer.diskStorage({
    destination: (req,file,cb) => {
        cb(null, './images')
    },
    filename: (req,file,cb) => {
        cb(null,Date.now() + "--" + file.originalname);
    },
})
const upload = multer({storage: fileStorageEngine});

// Body Parser
app.use(express.json())
app.use(cookieParser())
app.use(session({ secret: 'SECRET' }));
app.use(passport.initialize());


// Cors
app.use(cors());


// Port
const PORT = process.env.PORT || 5000;


// Router
app.use('/',router);

passport.use(new GoogleStrategy({
    clientID: "633340311369-mmosrqsp7ak8e6kaeqdkt18k8i20ik1f.apps.googleusercontent.com",
    clientSecret: "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",
    callbackURL: process.env.REACT_APP_BASE_URL+"/googleRedirect"
  },
  function(accessToken, refreshToken, profile, cb) {
      console.log(accessToken)
      console.log("GOOGLE BASED OAUTH VALIDATION GETTING CALLED")
      return cb(null, profile)
  }
));

passport.serializeUser(function(user, cb) {
    console.log('I should have jack ')
    cb(null, user);
});
  
  passport.deserializeUser(function(obj, cb) {
    console.log('I wont have jack shit')
    cb(null, obj);
});

app.get('/auth/google',  passport.authenticate('google', { scope: ['profile','email'] }))

app.get('/googleRedirect', passport.authenticate('google'),async (req, res)=>{
    console.log('redirected', req.user)
   const respone = await googleRedirect(req);
   console.log(respone,"response")
   res.cookie('jwt', respone.token , {httpOnly: true})
    res.redirect('http://localhost:3000/products')
})
// Mongo URI
const URI = "mongodb+srv://EcommerceRegistration:Ecommerce123@cluster0.9gduo.mongodb.net/Ecommerce?retryWrites=true&w=majority";

mongoose.connect(URI).then(() => {
    app.listen(PORT , () => {
        console.log(`Server is running on ${PORT}`)
    })
    
}).catch((error)=>{
    console.log(error)
});

process.on('uncaughtException', function(err) {
    console.log(err);
});