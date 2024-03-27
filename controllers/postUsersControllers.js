const fs = require("fs");
const postUsers = require("../services/postUsers");
const { MongoClient, ObjectId } = require('mongodb');
const connectDataBase = require("../helpers/connectMongoDb"); // Importer votre fonction de service

const postUsersControllers = async (req, res) => {
    const postId = req.body.postId
    const message = req.body.message
    const photoprofil = req.body.photoProfil
    const userName = req.body.name
    const db = await connectDataBase();
   
   

    try {
        if (!postId || !message) {
            throw new Error("ID de publication ou message manquant");
        }
        if (req.file) {
            // Gérer le cas où une image est envoyée
            const typesImages = ["image/jpg", "image/jpeg", "image/png"];
            if (!typesImages.includes(req.file.mimetype)) {
                throw new Error("Type de fichier non pris en charge");
            }
            const maxSize = 500000000000000; // Taille maximale en octets (500 Ko)
            if (req.file.size > maxSize) {
                throw new Error("Fichier trop volumineux");
            }

            // Nom du fichier
            const fileName = postId + "_" + Date.now() + ".jpg";
            const filePath = `${__dirname}/../client/public/uploads/postImage/${fileName}`;
            

            // Écrire le contenu du buffer dans le fichier
            //fs.writeFileSync(filePath, req.file.buffer);
            const writeStream = fs.createWriteStream(filePath);
            writeStream.write(req.file.buffer);
            writeStream.end();

            // Chemin de l'image pour la base de données
            const imageUrl = `http://localhost:3001/uploads/postImage/${fileName}`; 
            const updateResult = await db.collection("postUsers").updateOne(
                { _id: new ObjectId(postId) },
                { $set: { picture: imageUrl } }
            );
             // Appeler le service pour enregistrer les données dans la base de données
        const result = await postUsers(postId, message, imageUrl,photoprofil,userName);

        // Répondre avec un message de succès
        return res.status(200).json({ message: "Publication réussie", data: result });
        }else{
            const result = await postUsers(postId, message, "");
            return res.status(200).json({ message: "Publication réussie sans photo", data: result });
        }

       

    } catch (error) {
        console.error("Erreur lors de la publication :", error);
        return res.status(400).json({ error: error.message });
    }
};

module.exports = postUsersControllers;
