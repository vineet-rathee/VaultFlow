const mongoose=require("mongoose");
const accountModel = require("./account.model");

const ledger= new mongoose.Schema({
    account:{
        type:mongoose.Schema.ObjectId,
        ref:"account",
        required:true,
        immuatable:true,
    },
    amount:{
        type:Number,
        min:0,
        required:true,
        immuatable:true,
    },
    transaction:{
        type:mongoose.Schema.ObjectId,
        ref:"transaction",
        required:true,
        immuatable:true,
    },
    type:{
        type:String,
        enum:["CREDIT","DEBIT"],
        immuatable:true,
        required:true,
    }
},)

async function preventLedgerModification() {
    throw new Error("ledges data can not be modified");
}

ledger.pre('findOneAndUpdate', preventLedgerModification);
ledger.pre('updateOne', preventLedgerModification);
ledger.pre('deleteOne', preventLedgerModification);
ledger.pre('remove', preventLedgerModification);
ledger.pre('deleteMany', preventLedgerModification);
ledger.pre('updateMany', preventLedgerModification);
ledger.pre("findOneAndDelete", preventLedgerModification);
ledger.pre("findOneAndReplace", preventLedgerModification);

module.exports=mongoose.model("ledger",ledger);