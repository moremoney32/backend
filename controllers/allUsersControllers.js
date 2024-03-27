const allUsers = require("../services/allUsers")

const allUsersControllers = async(req,res)=>{
    try {
        const data = await allUsers();
        const allUserData = data.data
        res.status(200).json({message:"tous les users",allUserData})
        
    } catch (error) {
        messageError = error.message
        res.status(400).json({ message: "echec lors de la recuperation des users", messageError });
        
    }
}
module.exports = allUsersControllers