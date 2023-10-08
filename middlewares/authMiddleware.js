const jwt=require("jsonwebtoken")


const userAuth= async(req,res,next)=>{
    const authHeader=req.headers.authorization
    if(!authHeader || !authHeader.startsWith("Bearer")){
        res.status(403).send("Not Authenticated")
    }

    const token=authHeader.split(" ")[1]
    try {
        const payload=jwt.verify(token,process.env.JWT_SECRET)
        req.user={userId:payload.userId}
    } catch (error) {
        res.status(403).send("auth failed")
    }
}

module.exports=userAuth;