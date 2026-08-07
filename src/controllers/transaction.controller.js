const transactionModel=require("../models/transaction.model");
const ledgerModel=require("../models/ledger.model");
const mongoose=require("mongoose");
const emailService=require("../services/email.service");
const userModel=require("../models/user.model");
const accountModel=require("../models/account.model");

async function createTransaction(req,res) {
    const from=req.from;
    const to=req.to;
    const {amount}=req.body;

    const session= await mongoose.startSession();
    try{
        session.startTransaction();

        const transactions= await transactionModel.create([{
            from,to,amount
        }],{session});

        const transaction=transactions[0];

        const debitEntry=await ledgerModel.create([{
            account:from,
            amount,
            transaction:transaction._id,
            type:"DEBIT",
        }],{session});

        const creditEntry= await ledgerModel.create([{
            account:to,
            amount,
            transaction:transaction._id,
            type:"CREDIT",
        }],{session});

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

    const fromUser=await userModel.findOne({_id:req.fromId});
    const touser=await userModel.findOne({_id:req.toId});

    // emailService.sendDebitEmail(fromUser.email,fromUser.name,amount);
    // emailService.sendCreditEmail(touser.email,touser.name,amount);

}

async function Debit(req,res){
    const id=req.id;
    const {amount,username}=req.body;
    const account =await accountModel.findOne({username});
    const session= await mongoose.startSession();
    try{
        session.startTransaction();
        
        const transactions= await transactionModel.create([{
            from:account._id,amount
        }],{session});

        const transaction=transactions[0];

        const debitEntry=await ledgerModel.create([{
            account:account._id,
            amount,
            transaction:transaction._id,
            type:"DEBIT",
        }],{session});

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
    // emailService.sendDebitEmail(user.email,user.name,amount);

}

async function balance(req,res) {
    const {username}=req.body;
    const account=await accountModel.findOne({username});
    const balance=await account.getBalance();
    return res.json({
        balance,
    });
}

module.exports={createTransaction,Debit,balance};