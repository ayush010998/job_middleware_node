const express=require("express");
const userAuth=require("../middlewares/authMiddleware")
const updateUserController=require("../controllers/userControllers");

const router=express.Router();




router.put('/update-user',userAuth,updateUserController);






module.exports=router;