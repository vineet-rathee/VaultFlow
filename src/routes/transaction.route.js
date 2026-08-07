const express=require("express");
const router=express.Router();

const middleware=require("../middleware/transaction.middleware");
const controller=require("../controllers/transaction.controller");

router.post("/createTransaction",middleware.nameToId,middleware.verifyToken,middleware.verifyDetails,controller.createTransaction);

router.post("/debit",middleware.verifyUser,middleware.verifyDebit,controller.Debit);

router.get("/balance",middleware.verifyUser,controller.balance);

module.exports=router;