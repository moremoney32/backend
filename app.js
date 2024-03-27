require("dotenv").config({path:"./config/.env"})

const express = require("express");
const path = require('path');
 const checkUser = require("./midleware/checkUser")
const app = express();
const router = require("./routers/router");
const cors = require("cors");
const bodyParser = require("body-parser");
const cookieParser = require("cookie-parser");
const authMidleware = require("./midleware/authMidleware");
// Configuration de CORS
const corsOptions = {
  origin: "*", // Autoriser les requêtes provenant de cette URL
  methods: "GET,HEAD,PUT,PATCH,POST,DELETE", // Ajouter la méthode PATCH
  credentials: true, // Autoriser les cookies
};

app.use(cors(corsOptions)); // Utiliser les options de CORS
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(express.json());
app.use(cookieParser()); 
 app.get("*",checkUser);
 app.get("/jwt",authMidleware,(req,res)=>{
    res.status(200).send(res.locals.user)
 })
 app.use((req, res, next) => {
  res.header('Access-Control-Allow-Origin', '*'); // Autoriser l'accès depuis n'importe quelle origine
  res.header('Access-Control-Allow-Methods', 'GET, POST, PUT, PATCH, DELETE, OPTIONS'); // Autoriser les méthodes nécessaires
  res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept, Authorization'); // Autoriser les en-têtes nécessaires
  next();
});
 // Autoriser l'accès public aux fichiers statiques dans le dossier uploads/profil
app.use('/uploads/profil', express.static(path.join(__dirname, "client/public/uploads/profil")));
app.use('/uploads/postImage', express.static(path.join(__dirname, "client/public/uploads/postImage")));
 
  app.use("/api", router);

app.listen(process.env.PORT, async ()=>{
    console.log(`notre app demarre sur :http//localhost ${process.env.PORT}`)
})