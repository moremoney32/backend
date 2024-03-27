const { MongoClient, ObjectId } = require('mongodb');
const connectDataBase = require("../helpers/connectMongoDb");
require("dotenv").config({ path: "../config/.env" });
const deleteUser = async(req,res)=>{
const userId = req.params.id;
const db = await connectDataBase();
if(!ObjectId.isValid(userId)){
    return res.status(400).json({message:"ID introuvable"})
}
const user = await db.collection(process.env.dbName).deleteOne({_id: new ObjectId(userId)});
if(user.modifiedCount ===0){
    return res.status(400).json({message:"utilisateur non trouve"})
}
try {
    res.status(200).json({message:"utilisateur supprime"})
} catch (error) {
    res.status(500).json({message:"probleme de connexion",error})
    
}
}
module.exports = deleteUser