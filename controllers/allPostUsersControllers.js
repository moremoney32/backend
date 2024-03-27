const allPosts = require("../services/allPosts")

const allPostUsersControllers = async(req,res)=>{
    try {
        const data = await allPosts();
        const allPostData = data.data
        res.status(200).json({message:"tous les posts",allPostData})
        
    } catch (error) {
        messageError = error.message
        res.status(400).json({ message: "echec lors de la recuperation des users", messageError });
        
    }
}
module.exports = allPostUsersControllers