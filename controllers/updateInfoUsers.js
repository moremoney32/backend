const {ObjectId} = require("mongodb");
const connectDataBase = require("../helpers/connectMongoDb")
require("dotenv").config({path:"../config/.env"})
const updateInfoUsers = async(req,res)=>{
    const userId = req.params.id;
    const db = await connectDataBase();
    if(!ObjectId.isValid(userId)){
        res.status(400).json({message:"user not found"})
    }
    const {bio} = req.body
    console.log(bio)
    const user = await db.collection(process.env.dbName).updateOne({_id:new ObjectId(userId)},{$set:{bio:bio}});//si je veux mettre lobjet a jour je mets juste les accolades sur name 
    if(user.modifiedCount === 0){
        res.status(404).json({message:"utilisateur non trouve"})
    } 
    try {
        res.status(200).json({message:"mise a jour reussie"})
        
    } catch (error) {
        res.status(500).json({message:"erreurr de mise a jour connexion",error})
        
    }

}
module.exports = updateInfoUsers