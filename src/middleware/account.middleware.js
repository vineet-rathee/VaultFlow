const accountModel =require("../models/account.model");
const jwt=require("jsonwebtoken");

async function verifyToken(req,res,next) {
    const token=req.cookies.token;
    if(!token) return res.status(401).send("Login to proceed");
    try{
        const decoded=jwt.verify(token,process.env.JWTSECRET);
        req.id=decoded.id;
        next();
    }
    catch(err){
        res.status(401).send("!! Authentication failed !!")
    }
}

async function verifyUsername(req,res,next) {
    const user=await accountModel.findOne({username:req.username});
    if(!user) next();
    else return res.send("Account exists with this username please choose another");
}

async function verifyUser(req,res,next)
{
    const token=req.cookies.token;
    const {username}=req.body;
    const account=await accountModel.findOne({username});
    if(!token) return res.send("login or register to use this service");
    if(!account) return res.send("no account found with username");
    try{
        const decoded=await jwt.verify(token,process.env.JWTSECRET);
        if(decoded.id!==account.user.toString()) return res.send("the account is not of logged in user");
        next();
    }
    catch(err){
        return res.send("authentication failed !! login again");
    }
}

module.exports={verifyToken,verifyUsername,verifyUser};