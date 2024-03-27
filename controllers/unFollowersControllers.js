const { MongoClient, ObjectId } = require('mongodb');
const connectDataBase = require("../helpers/connectMongoDb");
require("dotenv").config({ path: "../config/.env" });

const unFollowersControllers = async (req, res) => {
  const userId = req.params.id;
  const db = await connectDataBase();

  if (!ObjectId.isValid(userId) || !ObjectId.isValid(req.body.idToUnfollow)) {
    return res.status(400).json({ message: "ID introuvable" });
  }

  try {
    // Retirer l'utilisateur du tableau "following"
    const user = await db
      .collection(process.env.dbName)
      .updateOne(
        { _id: new ObjectId(userId) },
        { $pull: { following: req.body.idToUnfollow } }
      );

    if (user.modifiedCount === 0) {
      return res.status(400).json({ message: "Utilisateur non trouvé" });
    }

    res.status(200).json({ message: "Personne retirée de mes following" });

    // Retirer le follower du tableau "followers" de la personne suivie
    const userFollower = await db
      .collection(process.env.dbName)
      .updateOne(
        { _id: new ObjectId(req.body.idToUnfollow) },
        { $pull: { followers: userId } }
      );

    if (userFollower.modifiedCount === 0) {
      return res.status(400).json({ message: "Utilisateur non trouvé" });
    }
  } catch (error) {
    res.status(500).json({ message: "Problème de connexion", error });
  }
};

module.exports = unFollowersControllers;
