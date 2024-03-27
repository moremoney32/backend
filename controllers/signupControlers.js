require("dotenv").config({path:"../config/.env"})
const {signup} = require("../services/signup")
const transporter = require('../helpers/nodemail');
const jwt = require('jsonwebtoken');
const secretKey = process.env.secretKey;
const expiresIn = process.env.expiresIn;

const signupControlers = async(req,res)=>{
    const {email,password,name,secondName} = req.body
    
    try {
        const result = await signup(email,password,name,secondName)

        //const userId = result.id
        const code = result.data.code
        //const token = jwt.sign({  userId }, secretKey, { expiresIn });
        const mailOptions = {
            from: 'tflkmc1990@gmail.com',
            to: req.body.email,
            subject: 'Code de confirmation',
            text: `Votre code de confirmation est : ${code}`,
          };
          /*transporter.sendMail(mailOptions, (error, info) => {
            if (error) {
              res.status(500).json({ message: 'Erreur lors de lenvoi de le-mail de confirmation' });
            } else {*/
              res.status(200).json({ message: 'Utilisateur créé avec succès',userId:result.id });//json permet de faire transister la data
           /* }
          });*/
        
    } catch (error) {
        messageError = error.message
        res.status(400).json({ message: "echec inscription", messageError });
        
    }

}
module.exports = signupControlers