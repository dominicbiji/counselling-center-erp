const express=require("express")
const router=express.Router()
const auth=require("../middleware/authMiddleware")
const role=require("../middleware/roleMiddleware")
const servicecon=require("../controllers/serviceController")

router.post("/addservice",auth,role("admin"),servicecon.createService)
router.get("/getservice",auth,role("admin","receptionist"),servicecon.getServices)
router.get("/active",auth,role("admin","receptionist"),servicecon.getActiveServices)
router.put("/updateservice/:id",auth,role("admin"),servicecon.updateServices)



module.exports=router