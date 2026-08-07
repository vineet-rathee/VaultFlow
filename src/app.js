const express=require("express");
const cookie=require("cookie-parser");

const app=express();
app.use(express.json());
app.use(express.urlencoded({extended:true}));
app.use(cookie());

const authRoute=require("./routes/auth.route");
const accountRoute=require("./routes/account.route");
const transactionRoute=require("./routes/transaction.route");
const systemRoute=require("./routes/system.route");

app.use("/bank/auth",authRoute);
app.use("/bank/account",accountRoute);
app.use("/bank/transaction",transactionRoute);
app.use("/bank/system",systemRoute);

module.exports=app;