const connectDataBase = require("../helpers/connectMongoDb")
require("dotenv").config({path:"../config/.env"})
const allPosts = async()=>{
    const db = await connectDataBase();
  const  allPostselect = await db.collection("postUsers").find({},{ projection: { password: 0 } }).toArray();
    try {
        return ({data:allPostselect})
        
    } catch (error) {
        throw({message:"probleme de recuperation des users dans la base de donnee"})
        
    }

}
module.exports = allPosts