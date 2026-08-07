require("dotenv").config();
const app=require("./src/app");
const db=require("./src/configs/mongoose");

app.listen(process.env.PORT,(err)=>{
    console.log(`Server started at Port = ${process.env.PORT}`);
});