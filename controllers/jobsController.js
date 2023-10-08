const Job = require("../models/jobsModel");

const createJobController=async()=>{
    const {company,position}=req.body
    if(!company || !position){
        res.status(400).send("Please provide company name and position you are trying to apply ");
    
    }
    req.body.createdBy=req.user.userId;
    const job=await Job.create(req.body);
    res.status(201).json({job});

}


const getJobController=async()=>{
    const jobs=await Job.find({createdBy:req.user.userId})
    res.status(200).json({
        totalJobs:jobs.length,
        job,

    })

}

const updateJobController=async(req,res)=>{
    const {id}=req.params
    const {company,position}=req.body
    if(!company || !position){
        res.status(400).send("Please provide all the fields")
    }
    const job=Job.findOne({_id:id})
    if(!job){
        res.status(400).send("no jobs for this specific id")
    }
    if(req.user.userId === job.createdBy.toString()){
        res.status(400).send("you are not authorized for this job")
    }

    const updateJob=await Job.findOneAndUpdate({_id:id},req.body,{
        new:true,
        runValidators:true,
    })
    res.status(200).json({updateJob})

}

const deleteJobController=async(req,res)=>{
    const {id}=req.params
    const job=await Job.findOne({_id:id})

    if(!job){
        res.status(400).send("no jobs found with this specific id")
    }
    if(!req.user.userId===job.createdBy.toString()){
        res.status(400).send("you are not authorized to delete this job")
    }
    await job.remove()
    res.status(200).json({message:"Job deleted successfully"})


}



module.exports={createJobController,getJobController,updateJobController,deleteJobController}