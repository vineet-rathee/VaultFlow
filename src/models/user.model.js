const mongoose = require("mongoose");
const bcrypt = require("bcrypt"); 

const userSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
        trim: true
    },

    mobile: {
        type: String,
        required: true,
        unique: true
    },

    email: {
        type: String,
        required: [true,"Email is required for creating an account"],
        unique: true,
        lowercase: true,
        match: [/^[^\s@]+@[^\s@]+\.[^\s@]+$/, "Please enter a valid email"],
    },

    password: {
        type: String,
        required: [ true, "Password is required for creating an account" ],
        minlength: [ 6, "password should contain more than 6 character" ],
        select: false
    },

    boss:{
        type:Boolean,
        default:false
    }

},
{
    timestamps:true,
});

userSchema.pre("save",async function (){
    if(!this.isModified("password")) return
    const hashed=await bcrypt.hash(this.password,10);
    this.password=hashed;

})

userSchema.methods.comparePassword= async function (password){
    return bcrypt.compare(password,this.password);
}


module.exports = mongoose.model("user", userSchema);