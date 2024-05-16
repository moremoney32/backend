require("dotenv").config({path:"./config/.env"})

const express = require("express");
const path = require('path');
 //const checkUser = require("./midleware/checkUser")
const app = express();
const router = require("./routers/router");
const cors = require("cors");
const bodyParser = require("body-parser");
const cookieParser = require("cookie-parser");
const authMidleware = require("./midleware/authMidleware");
// Configuration de CORS
const corsOptions = {
  origin: "*", // Autoriser les requêtes provenant de cette URL
  methods: "GET,HEAD,PUT,PATCH,POST,DELETE", 
  credentials: true,
  allowedHeaders: ["Origin", "X-Requested-With", "Content-Type", "Accept", "Authorization", "Custom-Header"] // Autoriser les cookies
};

app.use(cors(corsOptions)); // Utiliser les options de CORS
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(express.json());
app.use(cookieParser()); 

 /*app.use((req, res, next) => {
  res.header('Access-Control-Allow-Origin', '*'); // Autoriser l'accès depuis n'importe quelle origine
  res.header('Access-Control-Allow-Methods', 'GET, POST, PUT, PATCH, DELETE, OPTIONS'); // Autoriser les méthodes nécessaires
  res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept, Authorization'); // Autoriser les en-têtes nécessaires
  next();
});*/
 // Autoriser l'accès public aux fichiers statiques dans le dossier uploads/profil
app.use('/uploads/profil', express.static(path.join(__dirname, "client/public/uploads/profil")));
app.use('/uploads/postImage', express.static(path.join(__dirname, "client/public/uploads/postImage")));
//manumanu mon token cette route intercepte tous les get d un userId e verifie si il a son token valide
//app.get("*",checkUser);
 app.get("/jwt",cors(corsOptions),authMidleware,(req,res)=>{
  try {//console.log(res.locals)
    //console.log(res.locals.user)
    //console.log(res.locals.userId)
    res.status(200).send(res.locals.userId)
    
  } catch (error) {
    res.status(200).send({message:"iiiziiii"})
  }
  
 })
 
  app.use("/api", router);

app.listen(process.env.PORT, async ()=>{
    console.log(`notre app demarre sur :http//localhost ${process.env.PORT}`)
})