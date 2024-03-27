require("dotenv").config({path:"../config/.env"})
const connectDataBase = require("../helpers/connectMongoDb")
const infoUsers = async(email)=>{
    const db = await connectDataBase();
    const existEmail = await db.collection(process.env.dbName).findOne({email},{ projection: { password: 0 } })
    if(!existEmail){
        throw{message:"utilisateur non reconnu"}
    }
    try {
        return ({
            data:existEmail,message:"infos recuperes"
        })
        
    } catch (error) {
        throw({message:"probleme de recuperation de ce user dans la base de donnee"})
           
    }


}
module.exports = infoUsers