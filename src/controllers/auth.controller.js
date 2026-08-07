const userModel=require("../models/user.model");
const jwt=require("jsonwebtoken");
const emailService=require("../services/email.service")

// POST bank/auth/register
async function register(req,res) {
    const {name,mobile,email,password} =req.body;
    const user=await userModel.create({
        name,mobile,email,password,
    }) 

    const token=jwt.sign({id:user._id,},process.env.JWTSECRET,{ expiresIn: "1d" });
    res.cookie("token",token);

    res.json({
        message:"User registered successfully",
        user,
    });

    // await emailService.sendRegistrationEmail(user.email,user.name);
}

// POST bank/auth/login
async function login(req,res) {
    const mobile=req.body?.mobile;
    const email=req.body?.email;
    const password=req.body.password;
    const user= await userModel.findOne({$or:[{mobile},{email}]}).select("+password");
    if(user.comparePassword(password))
    {
        const token=jwt.sign({id:user._id,},process.env.JWTSECRET,{ expiresIn: "1d" });
        res.cookie("token",token);

        res.json({
            message:"User logged in successfully",
            user,
        });
        // await emailService.sendLoginEmail(user.email,user.name);
    }
    else res.send("password not correct")
    
}

async function logout(req,res) {
    res.clearCookie("token");
    res.send("!! logged out !! ");
}


module.exports={register,login,logout};