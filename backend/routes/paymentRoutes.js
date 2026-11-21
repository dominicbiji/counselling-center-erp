const express=require("express")
const router=express.Router()
const payController=require("../controllers/paymentController")
const auth=require("../middleware/authMiddleware")
const role=require("../middleware/roleMiddleware")


router.post("/createPayment",auth,role("client"),payController.createPayment)
router.post("/verifyPayment",auth,role("client"),payController.verifyPayment)
router.post("/CounterPay",auth,role("receptionist","admin"),payController.payAtCounter)
router.get("/revenue",auth,role("admin"),payController.getRevenue)




module.exports=router