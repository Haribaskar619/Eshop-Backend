const GoogleStrategy = require('passport-google-oauth20').Strategy;
const passport = require('passport')
const jwt = require('jsonwebtoken')


var JwtStrategy = require('passport-jwt').Strategy,
    ExtractJwt = require('passport-jwt').ExtractJwt;

jwtFromRequest = (req, res, next) => {
  console.log(req.headers);
  const token =
    req.body.token || req.query.token || req.headers["authorization"] ;
    console.log(token , "token")
    if (!token) {
      return res.status(403).send("A token is required for authentication");
    }
    try {
      console.log(config.TOKEN_KEY,"Line 14")
      const decoded = jwt.verify(token, config.TOKEN_KEY);
      req.user = decoded;
    } catch (err) {
      return res.status(401).send("Invalid Token");
    }
    
    return next();
    
  };


passport.use(new JwtStrategy( function(jwt_payload, done) {
  console.log("JWT BASED  VALIDATION GETTING CALLED")
  console.log("JWT", jwt_payload)
  if (CheckUser(jwt_payload.data)) {
      return done(null, jwt_payload.data)
  } else {
      // user account doesnt exists in the DATA
      return done(null, false);
  }
}));



passport.use(new GoogleStrategy({
  clientID: "633340311369-mmosrqsp7ak8e6kaeqdkt18k8i20ik1f.apps.googleusercontent.com",
  clientSecret: "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",
  callbackURL: "http://localhost:5000/googleRedirect"
},
function(accessToken, refreshToken, profile, cb) {
    console.log(accessToken)
    console.log("GOOGLE BASED OAUTH VALIDATION GETTING CALLED")
    return cb(null, profile)
}
));

passport.serializeUser((user,done) => {
    done(null,user);
})

passport.deserializeUser((user,done) => {
    done(null,user);
})


