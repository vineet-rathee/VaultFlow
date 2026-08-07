const accountModel=require("../models/account.model");
const transactionModel=require("../models/transaction.model");
const ledgerModel=require("../models/ledger.model");
const userModel = require("../models/user.model");
const mongoose=require("../configs/mongoose");

async function Credit(req,res) {
    const {username,amount}=req.body;
    const account=await accountModel.findOne({username});
    const session=await mongoose.startSession();
    try{
        session.startTransaction();

        const transactions=await transactionModel.create([{
            to:account._id,
            amount,
            status:"pending"
        }],{session});

        const transaction=transactions[0];

        const credit=await ledgerModel.create([{
            account:account._id,
            amount,
            type:"CREDIT",
            transaction:transaction._id,
        }])

        transaction.status="completed";
        await transaction.save({session});

        await session.commitTransaction();
        res.send(transaction);
    }
    catch(err){
        await session.abortTransaction();
        res.status(500).send(err.message);
    }
    finally{
        session.endSession();
    }
    const user=await userModel.findOne({_id:account.user});
    //emailService.sendCreditEmail(user.email,user.name,amount);
}

async function close(req,res) {
    const {username}=req.body;
    let account= await accountModel.findOne({username});
    if(!account) return res.send("no account found");
    if(account.status==="Closed") return res.send("account already closed");
    if(account.status==="Active") return res.send("freeze the account first in ordler to close")
    account= await accountModel.findOneAndUpdate({username},{status:"Closed"},{new:true});
    res.json({
        message:"account is now closed",
        account,
    })
}

async function active(req,res) {
    const {username}=req.body;
    let account= await accountModel.findOne({username});
    if(!account) return res.send("no account found");
    if(account.status==="Active") res.send("account already active");
    if(account.status==="Closed") res.send("account is closed can not activate again");
    account= await accountModel.findOneAndUpdate({username},{status:"Active"},{new:true});
    res.json({
        message:"account is now active",
        account,
    })
}


module.exports={Credit,close,active};
