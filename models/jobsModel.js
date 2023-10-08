const mongoose=require("mongoose");

const jobSchema=new mongoose.Schema({
    company:{
        type:String,
        required:true,
    },
    position:{
        type:String,
        required:true,
    },
    status:{
        type:String,
        enum:['pending','rejected','selected'],
        default:'pending',
    },
    workType:{
        type:String,
        enum:['full-time','part-time','intern'],
        default:'full-time',
    },
    workLocation:{
        type:String,
        default:Bangalore,
        required:true,
    },



},{timestamps:true})


module.exports=mongoose.model("Job",jobSchema)