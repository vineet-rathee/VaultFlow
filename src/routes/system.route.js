const express=require("express");
const router=express.Router();

const middleware=require("../middleware/system.middleware");
const controller=require("../controllers/system.controller");

router.post("/credit",middleware.verifySystem,middleware.verifycredit,controller.Credit);

router.post("/close",middleware.verifySystem,controller.close);

router.post("/active",middleware.verifySystem,controller.active);

//router.post("/freeze",middleware.verifySystem,controller.freeze);

module.exports=router;