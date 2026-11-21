const express=require("express")
const router=express.Router()
const auth=require("../middleware/authMiddleware")
const role=require("../middleware/roleMiddleware")
const adminController=require("../controllers/adminController")



router.get("/dashboard",auth,role("admin","receptionist"),adminController.adminDashboard)

module.exports=router