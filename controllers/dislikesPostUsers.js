const { MongoClient, ObjectId } = require('mongodb');
const connectDataBase = require("../helpers/connectMongoDb");
require("dotenv").config({ path: "../config/.env" });

const dislikesPostUsers = async (req, res) => {
  const userId = req.params.id;
  const db = await connectDataBase();

  if (!ObjectId.isValid(userId) || !ObjectId.isValid(req.body.postId)) {
    return res.status(400).json({ message: "ID introuvable" });
  }

  try {
    // Retirer l'utilisateur du tableau des likers
    const user = await db
      .collection("postUsers")
      .updateOne(
        { _id: new ObjectId(userId) },
        { $pull: { likers: req.body.postId } }
      );

    if (user.modifiedCount === 0) {
      return res.status(400).json({ message: "Utilisateur non trouvé" });
    }

    res.status(200).json({ message: "Personne retirée de mes likes" });

    // Retirer id du post likes
    const userFollower = await db
      .collection(process.env.dbName)
      .updateOne(
        { _id: new ObjectId(req.body.postId) },
        { $pull: { likes: userId } }
      );

    if (userFollower.modifiedCount === 0) {
      return res.status(400).json({ message: "Utilisateur non trouvé" });
    }
  } catch (error) {
    res.status(500).json({ message: "Problème de connexion", error });
  }
};

module.exports = dislikesPostUsers;