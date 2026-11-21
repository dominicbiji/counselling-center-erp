const express=require("express")
const router=express.Router()
const billController=require("../controllers/billController")
const auth=require("../middleware/authMiddleware")
const role=require("../middleware/roleMiddleware")

router.get("/getbill",auth,role("client","receptionist","admin"),billController.getBills)
router.get("/fetchAllBill",auth,role("receptionist","admin"),billController.fetchAllBill)

module.exports=router