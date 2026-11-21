const express=require("express")
const router=express.Router()
const notController=require("../controllers/notificationController")
const auth=require("../middleware/authMiddleware")


router.get("/getNot",auth,notController.getNotification)
router.put("/updateNot/:id",auth,notController.markAsRead)

module.exports=router