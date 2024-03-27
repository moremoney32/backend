/***function qui verifie  que a chaque requete get dun utilisateur si il a encore un token valide */
const jwt = require("jsonwebtoken");
require("dotenv").config({ path: "../config/.env" });

const checkUser =  (req, res, next) => {
  const token = req.cookies.jwt;
  if (token) {
 
    jwt.verify(token, process.env.secretKey,async(err,decodedToken)=>{
        if(err){
            res.locals.user = null; 
            res.cookie("jwt", "", { maxAge: 1 }); 
            console.log('false false')
            next();
        }else{
            const userId = decodedToken.userId;
            console.log(userId)
            console.log('tu as le cookies')
            res.locals.user = userId
            next();

        }
    });
   
  } else {
    
    res.locals.user = null;
    res.cookie("jwt", "", { maxAge: 1 });
    console.log('no token')
    next();
  }
};

module.exports = checkUser;

