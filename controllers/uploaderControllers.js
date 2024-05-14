const fs = require("fs");
const { MongoClient, ObjectId } = require('mongodb');
const connectDataBase = require("../helpers/connectMongoDb");
require("dotenv").config({ path: "../config/.env" });

const uploaderControllers = async (req, res) => {
    const userId = req.body.userId; // Supposons que le champ soit userId, à adapter si nécessaire
    const db = await connectDataBase();

    try {
        // Vérifier la validité de l'ID utilisateur
        if (!ObjectId.isValid(userId)) {
            return res.status(400).json({ message: "ID utilisateur introuvable" });
        }

        // Vérifier si un fichier a été téléchargé
        if (!req.file) {
            throw new Error("Aucun fichier trouvé dans la requête");
        }

        
        const allowedTypes = ["image/jpg", "image/jpeg", "image/png"];
        if (!allowedTypes.includes(req.file.mimetype)) {
            throw new Error("Type de fichier non pris en charge");
        }

       
        const maxSize = 500000000000000; 
        if (req.file.size > maxSize) {
            throw new Error("Fichier trop volumineux");
        }

        // Chemin de stockage local de l'image
        const fileName = `${userId}.jpg`; 
        const filePath = `${__dirname}/../client/public/uploads/profil/${fileName}`;

        //  contenu du buffer dans le fichier
        const writeStream = fs.createWriteStream(filePath);
        writeStream.write(req.file.buffer);
        writeStream.end();

        //  chemin de l'image dans la base de données
        //https://changes-social.onrender.com
        const imageUrl = `https://changes-social.onrender.com/uploads/profil/${fileName}`; 
        const updateResult = await db.collection(process.env.dbName).updateOne(
            { _id: new ObjectId(userId) },
            { $set: { picture: imageUrl } }
        );

        // Vérifier si l'utilisateur a été mis à jour avec succès dans la base de données
        if (updateResult.modifiedCount === 0) {
            return res.status(404).json({ message: "Utilisateur non trouvé" });
        }

        // Répondre avec un message de réussite
        return res.status(200).json({ message: "Fichier téléchargé et utilisateur mis à jour avec succès" });

    } catch (error) {
        console.error("Erreur lors du téléchargement du fichier :", error);
        return res.status(400).json({ error: error.message });
    }
};

module.exports = uploaderControllers;


