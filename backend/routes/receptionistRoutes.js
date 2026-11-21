const express=require("express")
const router=express.Router()
const auth=require("../middleware/authMiddleware")
const role=require("../middleware/roleMiddleware")
const receptionist=require("../controllers/receptionistController")

router.get("/getreceptionist",auth,role("admin"),receptionist.getReceptionist)
router.post("/addReceptionist",auth,role("admin"),receptionist.addReceptionist)
router.put("/updateReceptionist/:id",auth,role("admin"),receptionist.updateReceptionist)
router.delete("/deleteReceptionist/:id",auth,role("admin"),receptionist.deleteReceptionist)
router.get("/viewReceptionist/:id",auth,role("admin"),receptionist.viewReceptionist)

module.exports=router