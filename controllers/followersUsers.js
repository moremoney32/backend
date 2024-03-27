const { MongoClient, ObjectId } = require('mongodb');
const connectDataBase = require("../helpers/connectMongoDb");
require("dotenv").config({ path: "../config/.env" });
const followersUsers = async(req,res)=>{
    const userId = req.params.id;
const db = await connectDataBase();
if((!ObjectId.isValid(userId)) || (!ObjectId.isValid(req.body.idToFollow))){
    return res.status(400).json({message:"ID introuvable"})
}
try {
    //ajout d un following que j ai touche dans mon tableau de following
    const user = await db.collection(process.env.dbName).updateOne({_id: new ObjectId(userId)},{$push: {following: req.body.idToFollow}});
if(user.modifiedCount === 0){
    return res.status(400).json({message:"utilisateur non trouve"})
}
res.status(200).json({message:"personne ajoute dans mes following"})
//ajout d un follower chez la personne que j ai following
const userFollower = await db.collection(process.env.dbName).updateOne({_id: new ObjectId(req.body.idToFollow)},{$push: {followers: req.params.id}});
if(userFollower.modifiedCount === 0){
    return res.status(400).json({message:"utilisateur non trouve"})
}
    
} catch (error) {
    res.status(500).json({message:"probleme de connexion",error})
    
}

}
module.exports = followersUsers