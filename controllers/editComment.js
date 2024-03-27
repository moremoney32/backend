const { MongoClient, ObjectId } = require('mongodb');
const connectDataBase = require("../helpers/connectMongoDb");
require("dotenv").config({ path: "../config/.env" });

const editComment = async (req, res) => {
    const userId = req.params.id;
    const commentIdFromBody = req.body.uniqueCommentId; // Récupération de l'id du commentaire depuis le req.body
    const db = await connectDataBase();

    try {
        if (!ObjectId.isValid(userId) || !ObjectId.isValid(commentIdFromBody)) {
            return res.status(400).json({ message: "ID introuvable" });
        }

        const { commentText } = req.body;

        const user = await db.collection("postUsers").updateOne(
            { _id: new ObjectId(userId), "comments.commentId": new ObjectId(commentIdFromBody) },
            {
                $set: {
                    "comments.$.commentText": commentText,
                    "comments.$.time": new Date().getTime(),
                },
            }
        );

        if (user.modifiedCount === 0) {
            return res.status(404).json({ message: "utilisateur ou commentaire non trouvé" });
        }

        res.status(200).json({ message: "commentaire modifié avec succès" });

    } catch (error) {
        res.status(500).json({ message: "problème de connexion", error });
    }
};

module.exports = editComment;
