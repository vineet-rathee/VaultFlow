const express=require("express");
const router=express.Router();
const middleware=require("../middleware/auth.middleware");
const controller=require("../controllers/auth.controller")

router.post("/register",middleware.verifyUnique,controller.register);

router.post("/login",middleware.verifyPresence,controller.login);

router.post("/logout",controller.logout);

module.exports=router;