const express=require("express");
const router=express.Router();

const middleware=require("../middleware/account.middleware");
const controller=require("../controllers/account.controller");

router.post("/create",middleware.verifyToken,middleware.verifyUsername,controller.createAccount);

router.post("/close",middleware.verifyUser,controller.close);

module.exports=router;