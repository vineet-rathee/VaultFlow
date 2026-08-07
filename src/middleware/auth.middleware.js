const userModel=require("../models/user.model");

//verify the absence of email and mobile number 
async function verifyUnique(req,res,next){
    const {email,mobile}=req.body;
    const user=await userModel.findOne({$or:[{email},{mobile}]});
    if(!user) next();
    else 
    {
        res.json({
            message:"User already exists with the provided details",
        })
    }
}

//verify user is present for login or not
async function verifyPresence(req,res,next) {
    const email=req.body?.email;
    const mobile=req.body?.mobile;
    const user = await userModel.findOne({$or:[{mobile},{email}]});
    if(!user)
    {
        return res.send("NO USER FOUND");
    }
    next();
}

module.exports={verifyUnique,verifyPresence};