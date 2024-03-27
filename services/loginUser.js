require("dotenv").config({path:"../config/.env"})
const verifyPassword = require("../helpers/passwordRegex")
const verifyEmail = require("../helpers/verifyRegexEmail")
const bcrypt = require("bcrypt")
const connectDataBase = require("../helpers/connectMongoDb")
const loginUser = async(email,password)=>{
    if(!verifyEmail(email)){
        throw{message:"email non valide"}
    }
    if(!verifyPassword(password)){
        throw{message:"mauvaise syntaxe password"}
    }
    const db = await connectDataBase();
    const existEmail = await db.collection(process.env.dbName).findOne({email});
    if(!existEmail){
        throw{message:"mot de passe invalide ou email invalide"}//throw utilise pour gerer des erreurs dexeptions et transferer directement au premier catch
        
    }
    const enteredPassword = password;
    console.log(existEmail.password)
    const isPasswordValid = await bcrypt.compare(enteredPassword,existEmail.password)
    if(!isPasswordValid){
        throw{message:"mot de passe invalide ou email invalide"}
    }
    console.log(isPasswordValid)
    try {
        if(existEmail.authentification === true && isPasswordValid){
        return ({message:"connexion reussi",userId:existEmail._id})//pour gerer des resultats normaux ou finis
        }
        throw {message:"rentrer vous inscrire"}
        
    } catch (error) {
        throw { message: "probleme de connexion" };    
        
    }
}
module.exports = loginUser