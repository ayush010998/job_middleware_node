const express=require("express");
const userAuth = require("../middlewares/authMiddleware");
const createJobController = require("../controllers/jobsController");
const getJobController=require("../controllers/jobsController");
const updateJobController=require("../controllers/jobsController");
const deleteJobController=require("../controllers/jobsController");

const router=express.Router();



router.post("/create-jobs",userAuth,createJobController);


router.get("/get-jobs",userAuth,getJobController);

router.patch("/update-job/:id",useAuth,updateJobController);

router.delete("/delete-job",userAuth,deleteJobController);

module.exports=router
