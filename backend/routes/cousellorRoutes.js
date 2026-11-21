const express=require("express")
const router=express.Router()
const counsellorController=require("../controllers/counsellorController")
const auth=require("../middleware/authMiddleware")
const role=require("../middleware/roleMiddleware")

router.post("/addcounsellor",auth,role("admin"),counsellorController.addCounsellor)
router.get("/getcounsellor",auth,role("admin","receptionist"),counsellorController.getCounsellor)
router.put("/updatecounsellor/:id",auth,role("admin"),counsellorController.updateCounsellor)
router.delete("/deletecounsellor/:id",auth,role("admin"),counsellorController.deleteCounsellor)
router.get("/viewcounsellor/:id",auth,role("admin"),counsellorController.viewCounsellor)


module.exports=router