const mongoose=require("mongoose");
const ledgerModel=require("./ledger.model");
const account= new mongoose.Schema({
    user:{
        type:mongoose.Schema.ObjectId,
        ref:"user",
        required:true,
        index:true,
    },
    username:{
        type:String,
        unique:true,
    },
    status:{
        type:String,
        enum:["Active","Frozen","Closed"],
        default:"Active",
    },
    currency:{
        type:String,
        required:true,
        default:"INR",
    }
},{
    timestamps:true,
})

account.index({user:1,username:1,status:1});

account.methods.getBalance = async function(){
    const balanceData = await ledgerModel.aggregate([
        { $match: { account: this._id } },
        {
            $group: {
                _id: null,
                totalDebit: {
                    $sum: {
                        $cond: [
                            { $eq: [ "$type", "DEBIT" ] },
                            "$amount",
                            0
                        ]
                    }
                },
                totalCredit: {
                    $sum: {
                        $cond: [
                            { $eq: [ "$type", "CREDIT" ] },
                            "$amount",
                            0
                        ]
                    }
                }
            }
        },
        {
            $project: {
                _id: 0,
                balance: { $subtract: [ "$totalCredit", "$totalDebit" ] }
            }
        }
    ])

    if (balanceData.length === 0) {
        return 0
    }

    return balanceData[ 0 ].balance
}

module.exports=mongoose.model("account",account);