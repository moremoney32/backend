require("dotenv").config({path:"../config/.env"})
const settingsDataBase =  {

    MongoClient:require('mongodb').MongoClient,

    url:process.env.url,

    dbName:process.env.dbName
};

module.exports = settingsDataBase;