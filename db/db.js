

const mongoose=require("mongoose");

const connectDb=async()=>{
    try{
        const conn=await mongoose.connect(process.env.MONGO_URL)
        console.log("connected to database")
    }catch(error){
        console.log(`Mongodb error ${error}`);
    }
}

module.exports=connectDb