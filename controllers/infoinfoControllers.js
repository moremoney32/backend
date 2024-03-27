const { MongoClient, ObjectId } = require('mongodb');
const connectDataBase = require("../helpers/connectMongoDb");
require("dotenv").config({ path: "../config/.env" });

const infoinfoControllers = async (req, res) => {
   
        const db  = await connectDataBase();
        const userId = req.params.id
        //verifions si id ObjectId
        if(!ObjectId.isValid(userId)){
            return res.status(400).json({message:"ID introuvable"})
        }
        const user = await db.collection(process.env.dbName).findOne({_id:new ObjectId(userId)},{ projection: { password: 0 } })
        try {
            res.status(200).json({data:user})
        
    } catch (error) {
        messageError = error.message
        res.status(400).json({ message: "ID introuvable", messageError })
        
    }

};

module.exports = infoinfoControllers;
