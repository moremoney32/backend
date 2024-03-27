const connectDataBase = require("../helpers/connectMongoDb")
require("dotenv").config({path:"../config/.env"})
const allUsers = async()=>{
    const db = await connectDataBase();
  const  allUserSelect = await db.collection(process.env.dbName).find({},{ projection: { password: 0 } }).toArray();
    try {
        return ({data:allUserSelect})
        
    } catch (error) {
        throw({message:"probleme de recuperation des users dans la base de donnee"})
        
    }

}
module.exports = allUsers