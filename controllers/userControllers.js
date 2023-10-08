const User=require("../models/userModel");

const updateUserController=async (req,res)=>{
    const {name,email,lastname,password}=req.body
    if(!name || !email || !lastname || !password){
        res.status(400).send("please provide all fields to update")
    }
    const user=await User.findOne({_id:req.user.userId})
    user.name=name
    user.lastname=lastname
    user.email=email
    user.location=location

    await user.save()

    const token=user.createJWT()
    res.status(200).json({
        user,
        token,
    })


}

module.exports=updateUserController