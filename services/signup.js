
require("dotenv").config({path:"../config/.env"})
const verifyPassword = require("../helpers/passwordRegex")
const verifyEmail = require("../helpers/verifyRegexEmail")
const hasPassword = require("../helpers/hasPassword")
const codeAleatoireConfirm = require("../helpers/codeAleatoireConfirm")
const connectDataBase = require("../helpers/connectMongoDb")
const signup =  async(email,password,firstName,lastName) =>{
    if(!verifyEmail(email)){
        throw{message:"email non valide"}
    }
    if(!verifyPassword(password)){
        throw{message:"mauvaise syntaxe password"}
    }
   

    const db = await connectDataBase();
    const collectionName = process.env.dbName;
    const existEmail = await db.collection(collectionName).findOne({email})
    if(existEmail){
        throw{message:"cet email existe deja veuillez changer d adresse"}
    }
    const generatorCode = codeAleatoireConfirm(7)
    const timeGeneratorCode = new Date();
    const passwordHashed = await hasPassword(password);
    user = {
        picture:"",
        name:firstName,
        secondName:lastName,
        email:email,
        password:passwordHashed,
        code:generatorCode,
        timeCode:timeGeneratorCode,
        authentification:true,
        bio:"",
        pictures:[],
        followers:[],
        following:[],
        likes:[]
    }
    try {
        
        const result = await db.collection(collectionName).insertOne(user);
            const userId = result.insertedId.toString();
            return {data:user,id:userId};
                
    } catch (error) {
        console.log("erreur lors de l insertion dans la base de donnee",error)
        throw{message:"erreur lors de l insertion dans la base de donnee"}
        
    }

}
module.exports = {signup}