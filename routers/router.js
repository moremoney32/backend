const express = require("express");
const multer = require('multer');
const upload = multer().single('file');
const signupControlers = require("../controllers/signupControlers");
const loginController = require("../controllers/loginController");
const allUsersControllers = require("../controllers/allUsersControllers");
const infoUsersControllers = require("../controllers/infoUsersControllers");
const infoinfoControllers = require("../controllers/infoinfoControllers");
const updateInfoUsers = require("../controllers/updateInfoUsers");
const deleteUser = require("../controllers/deleteUser");
const followersUsers = require("../controllers/followersUsers");
const unFollowersControllers = require("../controllers/unFollowersControllers");
const logoutControllers = require("../controllers/logoutControllers");
const postUsersControllers = require("../controllers/postUsersControllers");
const updatePostUsers = require("../controllers/updatePostUsers");
const deletePostUser = require("../controllers/deletePostUsers");
const likesPostUsers = require("../controllers/likesPostUsers");
const dislikesPostUsers = require("../controllers/dislikesPostUsers");
const commentUser = require("../controllers/commentUser");
const editComment = require("../controllers/editComment");
const uploaderControllers = require("../controllers/uploaderControllers");
const allPostUsersControllers = require("../controllers/allPostUsersControllers");
const router = express.Router();

router.post("/signup",signupControlers)
router.post("/login",loginController)
router.get("/logout",logoutControllers)
router.post("/info",infoUsersControllers)
router.put("/updateinfousers/:id",updateInfoUsers)
router.put("/updatepostusers/:id",updatePostUsers)
router.put("/editcomment/:id",editComment)
router.delete("/deleteUser/:id",deleteUser)
router.delete("/deletepostuser/:id",deletePostUser)
router.patch("/follower/:id",followersUsers)
router.patch("/likepost/:id",likesPostUsers)
router.patch("/unfollower/:id",unFollowersControllers)
router.patch("/dislike/:id",dislikesPostUsers)
router.patch("/comment/:id",commentUser)
router.get("/",allUsersControllers)
router.get("/allpost",allPostUsersControllers)
router.get("/infoinfocontrollers/:id",infoinfoControllers)//une autre maniere de recuperer avec le get les elements d un utilisateur 
router.post("/postuser",upload,postUsersControllers)
router.post("/upload",upload,uploaderControllers)

module.exports = router