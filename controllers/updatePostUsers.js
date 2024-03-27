const { MongoClient, ObjectId } = require('mongodb');
const connectDataBase = require("../helpers/connectMongoDb");
require("dotenv").config({ path: "../config/.env" });
const updatePostUsers = async(req,res)=>{
    const userId = req.params.id;
    const db = await connectDataBase();
    if((!ObjectId.isValid(userId))){
        return res.status(400).json({message:"ID introuvable"})
    }
    const {message} = req.body
    try {
        const user = await db.collection("postUsers").updateOne({_id:new ObjectId(userId)},{$set:{message:message}});//si je veux mettre lobjet a jour je mets juste les accolades sur message 
        if(user.modifiedCount === 0){
            res.status(404).json({message:"utilisateur non trouve"})
        } 
        res.status(200).json({message:"mise a jour reussie"})
        
    } catch (error) {
        res.status(500).json({message:"erreur de mise a jour connexion",error})
        
    }
    }
    module.exports = updatePostUsers

