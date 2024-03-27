const connectDataBase = require("../helpers/connectMongoDb")
require("dotenv").config({path:"../config/.env"})
const postUsers = async(postId,message,imageUrl,photoprofil,userName)=>{
    const db = await connectDataBase();
    

   let postUser = {
        postId:postId,
        message:message,
        // Ajouter imageUrl uniquement si elle n'est pas vide
        ...(imageUrl && { picture: imageUrl }),
        video:"",
        likers:[],
        comments:[],
        photoprofil: photoprofil,
        UserName:userName,
        timePost:new Date().getTime()
    }
    try {
        const result = await db.collection("postUsers").insertOne(postUser)
        const userId = result.insertedId.toString();
            return {data:postUser,id:userId};
    } catch (error) {
        console.log("erreur lors de l insertion dans la base de donnee",error)
        throw{message:"erreur lors de l insertion dans la base de donnee"}
        
    }

}
module.exports = postUsers