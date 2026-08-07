const accountModel=require("../models/account.model");
const transactionModel=require("../models/transaction.model");
const ledgerModel=require("../models/ledger.model");
const jwt=require("jsonwebtoken");
const userModel = require("../models/user.model");

async function verifySystem(req,res,next) {
    const token=req.cookies.token;
    try{
        const decoded=jwt.verify(token,process.env.JWTSECRET);
        const user=await userModel.findOne({_id:decoded.id});
        if(!user.boss) return res.json({
            message:"this operation requires a higher official permission",
            user,
        });
        next();
    }
    catch(err)
    {
        return res.send("!! authentication failed !! ");
    }
}

async function verifycredit(req,res,next)
{
    const {username,amount} =req.body;
    const account=await accountModel.findOne({username});
    if(!account) return res.send("no account found");
    if(account.status!="Active") return res.send("account is eihter closed or frozen");
    next();
}

module.exports={verifySystem,verifycredit};
