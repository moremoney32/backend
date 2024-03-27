const infoUsers = require("../services/infoUsers")

const infoUsersControllers = async(req,res)=>{
    const {email} = req.body
    try {
        const data = await infoUsers(email)
        infoData = data.data;
        res.status(200).json({info:infoData,message:"information recuperee"})
        
    } catch (error) {
        res.status(400).json({message:"echec de recuperation"})
        
    }
}
module.exports = infoUsersControllers