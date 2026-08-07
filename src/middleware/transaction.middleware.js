const accountModel=require("../models/account.model");
const transactionModel=require("../models/transaction.model");
const ledger=require("../models/ledger.model");
const jwt=require("jsonwebtoken");
const userModel = require("../models/user.model");

async function nameToId(req,res,next) {
    const {from_username,to_username}=req.body;
    const fromUser=await accountModel.findOne({username:from_username});
    const toUser=await accountModel.findOne({username:to_username});
    if(!fromUser || !toUser) return res.send("enter correct username ");
    req.from=fromUser._id;
    req.to=toUser._id;
    req.fromUser=fromUser;
    req.toUser=toUser;
    next();
}

async function verifyToken(req,res,next) {
    const token=req.cookies.token;
    if(!token) return res.status(401).send("Login to proceed");
    try{
        const decoded=jwt.verify(token,process.env.JWTSECRET);
        const id=decoded.id;
        if(req.fromUser.user.toString() === id) next();
        else return res.status(401).send("!! Authentication failed !! ");
    }
    catch(err){
        res.status(401).send("!! Authentication failed !!")
    }
}

async function verifyDetails(req,res,next) {
    const from=req.from;
    const to=req.to;
    const {amount}=req.body;

    //validate the presence of detail
    if(!from || !to || !amount)
    {
        return res.send("Please provide all detail to initiate transaction");
    }
    // verify the detail of account
    const a=await accountModel.findOne({_id:from});
    const b=await accountModel.findOne({_id:to});
    if(!a) return res.send("from account not found !!");
    if(!b) return res.send("to account not found !!");
    
    //verify the status of accounts
    if(a.status!=="Active") return res.send(`debiter account is ${a.status}`);
    if(b.status!=="Active") return res.send(`creditor account is ${b.status}`);

    // verify amount of from account
    const balance=await a.getBalance();
    const amt=Number(amount);
    if(amt<0) return res.send("amount should be greater than 0 !! ")
    if(balance<amt) return res.send("insufficient balance in debiter account");

    req.fromId=a.user;
    req.toId=b.user;

    next();
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

async function verifyDebit(req,res,next){
    const {amount,username}=req.body;

    const account= await accountModel.findOne({username});
    if(!account) return res.send("no account found !! login again");
    if(account.status!=="Active") return res.send("account is either closed or frozen");

    const balance=await account.getBalance();
    const user=await accountModel.findOne({_id:account.user});
    if (user && user.boss) next();
    if(amount>balance) return res.send("not enough balance");
    next();
}

module.exports={nameToId,verifyDetails,verifyToken,verifyUser,verifyDebit};