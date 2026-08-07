const mongoose=require("mongoose");
const { randomUUID } = require("crypto");

const transaction= new mongoose.Schema({
    from:{
        type:mongoose.Schema.ObjectId,
        ref:"account",
        index:true,
    },
    to:{
        type:mongoose.Schema.ObjectId,
        ref:"account",
        index:true,
    },
    status:{
        type:String,
        enum:["pending","completed","failed","reversed"],
        default:"pending",
    },
    amount:{
        type:Number,
        required:[true,"enter the amount"],
        min:[0,"amount can not be negative"],
    },
    idempotencyKey: {
        type: String,
        default:randomUUID
    }
},{
    timestamps:true,
})

module.exports=mongoose.model("transaction",transaction);