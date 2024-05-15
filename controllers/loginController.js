
const loginUser = require("../services/loginUser");
const jwt = require("jsonwebtoken");
require("dotenv").config({path:'../config/.env'})

const loginController = async(req,res)=>{
    const {email,password} = req.body;
    try {
        const result = await loginUser(email,password)
        console.log(result)
        const id = result.userId.toString();
        console.log(id)
        if(result.message === 'connexion reussi'){
            const token = jwt.sign({ userId: id }, process.env.secretKey,  {expiresIn:process.env.expiresInn} );
            res.cookie("jwt", token, {
                httpOnly: false,
                maxAge: 8888888, // Durée de vie du cookie en millisecondes
                domain: "https://changes-social.onrender.com/", // Remplacer par votre domaine réel
                path: "/", // Accessible sur toutes les routes
              });
           // res.cookie("jwt",token,{httpOnly:true,maxAge:8888888 })//le nombre de jour d expiration doit etre pareil aue les cookies et token
            res.status(200).json({message:'connexion reussi'})
        }
        
        
    } catch (error) {
        messageError = error.message
        res.status(400).json({ message: "echec connexion", messageError });
        
    }

}
module.exports = loginController