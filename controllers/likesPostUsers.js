const { MongoClient, ObjectId } = require('mongodb');
const connectDataBase = require("../helpers/connectMongoDb");
require("dotenv").config({ path: "../config/.env" });
const likesPostUsers = async(req,res)=>{
    const userId = req.params.id;
const db = await connectDataBase();
if((!ObjectId.isValid(userId)) || (!ObjectId.isValid(req.body.postId))){
    return res.status(400).json({message:"ID introuvable"})
}
try {
    //ajout de id de la personne qui a liker mon commentaire  dans le tableau tableau de likes
    const user = await db.collection("postUsers").updateOne({_id: new ObjectId(userId)},{$push: {likers:req.body.postId}});
if(user.modifiedCount === 0){
    return res.status(400).json({message:"utilisateur non trouve"})
}
res.status(200).json({message:"likes ajoute dans mes likes"})
//ajout des id du post  likers
const userFollower = await db.collection(process.env.dbName).updateOne({_id: new ObjectId(req.body.postId)},{$push: {likes: req.params.id}});
if(userFollower.modifiedCount === 0){
    return res.status(400).json({message:"utilisateur non trouve"})
}
    
} catch (error) {
    res.status(500).json({message:"probleme de connexion",error})
    
}

}
module.exports = likesPostUsers

