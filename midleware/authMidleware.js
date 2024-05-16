/***function qui verifie  juste  si l utilisateur a le token si oui il peut se connecter car son id est reconnu */
const jwt = require("jsonwebtoken");
require("dotenv").config({ path: "../config/.env" });
const authMidleware = (req,res,next)=>{
    const token = req.cookies.jwt;
    //console.log(token)
    if(token){
        jwt.verify(token,process.env.secretKey, async(err,decodedToken)=>{
            if(err){
                console.log(err)
            }else{
                console.log(decodedToken.userId)
                res.locals.userId = decodedToken.userId;
                next()
            }
        })
    }else{
        console.log("notoken")
    }
}
module.exports = authMidleware