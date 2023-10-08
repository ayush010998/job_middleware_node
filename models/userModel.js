const mongoose=require("mongoose");

const validator=require("validator");
const bcrypt=require('bcryptjs');
const jwt =require('jsonwebtoken');

const userSchema=new mongoose.Schema({
    name:{
        type:String,
        required:true
    },
    lastName:{
        type:String,
        
    },
    email:{
        type:String,
        required:true,
        unique:true,
        validate:validator.isEmail
    },
    password:{
        type:String,
        required:true,
    },
    location:{
        type:String,
        default:"Bangalore"
    }


},{timestamps:true}

);


userSchema.pre('save',async function(){
    const salt=await bcrypt.genSalt(10)
    this.password=await bcrypt.hash(this.password,salt)
})


userSchema.methods.comparePasswords=async function (userPassword){
    const isMatch=await bcrypt.compare(userPassword,this.password);
    return isMatch
}

userSchema.methods.createJWT = function () {
    return jwt.sign({ userId: this._id }, process.env.JWT_SECRET, {
      expiresIn: "1d",
    });
  };

  
module.exports=mongoose.model("User",userSchema)