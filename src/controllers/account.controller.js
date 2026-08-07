const accountModel=require("../models/account.model");

async function createAccount(req,res){
    const id=req.id;
    const username=req.body.username;
    const account=await accountModel.create({
        user:id,
        username,
    });
    res.status(201).send(account);
}

async function close(req,res) {
    const {username} =req.body;
    const account= await accountModel.findOneAndUpdate({username},{status:"Frozen"},{new:true});
    res.json({
        message:"account freezed , contact system admin to open again or close permanently",
        account
    });
}

module.exports={createAccount,close};