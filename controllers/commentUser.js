const { MongoClient, ObjectId } = require('mongodb');
const connectDataBase = require("../helpers/connectMongoDb");
require("dotenv").config({ path: "../config/.env" });

const commentUser = async(req,res)=>{
    const userId = req.params.id;
    const db = await connectDataBase();
  
    if (!ObjectId.isValid(userId)) {
      return res.status(400).json({ message: "ID introuvable" });
    }
    const newCommentId = new ObjectId();
    const newComment = {
        commentId: req.body.commentId, //  l'ID de la personne qui commente
        uniqueCommentId: newCommentId, // Ajoute un nouvel identifiant unique pour le commentaire
        commenterPseudo: req.body.commenterPseudo,
        commentText: req.body.commentText,
        time: new Date().getTime(),
      };
    try {
        console.log(newComment)
        //ajout du commentaire  dans le tableau tableau comments
        const user = await db.collection("postUsers").updateOne({_id: new ObjectId(userId)},{$push: {comments:newComment
            
        }});
        console.log(user)
    if(user.modifiedCount === 0){
        return res.status(400).json({message:"utilisateur non trouve"})
    }
    res.status(200).json({message:" nouveau commentaire ajoute avec succes"})
    
   
        
    } catch (error) {
        res.status(500).json({message:"probleme de connexion",error})
        
    }
  

}
module.exports = commentUser;