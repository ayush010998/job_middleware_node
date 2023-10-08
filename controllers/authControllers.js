const User =require("../models/userModel");

const registerController=async(req,res,next)=>{
    try{
        const {name,email,password}=req.body

        if(!name){
            return res.status(400).send("please provide name")
        }
        if(!email){
            return res.status(400).send("please provide email")
        }
        if(!password){
            return res.status(400).send("please provide password")
        }
        const existingUser=await User.findOne({email})
        if(existingUser){
            return res.status(200).send({
                success:false,
                message:"user already registered"
            })
        }
        const user=await User.create({name,email,password})
        const token=User.createJWT()

        res.status(201).send({
            success:true,
            message:'User Created Successfully',
            user,
            token
        })
    }catch(error){
        console.log(error);
        next(error);
    }

}


const loginController=async(req,res)=>{
    const {email,password}=req.body;
    if(!email || !password){
        return res.status(400).send("pleaase provide your credentials")
    }

    const user=await User.findOne({email}).select("+password")
    if(!user){
        res.status(400).send("Invalid username or password")
    } 

    const isMatch=await User.comparePassword(password)
    if(!isMatch){
        return res.status(400).send("Invalid username and password")
    }

    user.password=undefined
    const token=User.createJWT()
    res.status(200).json({
        success:true,
        user,
        token,    
    })
}


module.exports=registerController