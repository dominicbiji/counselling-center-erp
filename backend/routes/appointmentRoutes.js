const express=require("express")
const router=express.Router()
const appointmentController=require("../controllers/appointmentController")
const auth=require("../middleware/authMiddleware")
const role=require("../middleware/roleMiddleware")


router.post("/addAppointment",auth,role("receptionist","admin"),appointmentController.addAppointment)
router.get("/getAppointment",auth,role("receptionist","admin"),appointmentController.getAppointment)
router.put("/updateAppointment/:id",auth,appointmentController.updateAppointment)
router.put("/cancelAppointment/:id",auth,appointmentController.cancelAppointment)
router.get("/myappointments",auth,role("counsellor"),appointmentController.fetchAppointment)
router.get("/clientAppointment",auth,role("client"),appointmentController.ClientDbAppointment)
router.get("/clientSession",auth,role("client"),appointmentController.ClientSessionHistory)
router.put("/updateStatus/:id",auth,role("counsellor"),appointmentController.updateStatus)
router.put("/updateNotes/:id",auth,role("counsellor"),appointmentController.updateNotes)
router.get("/viewApp/:id",auth,role("counsellor"),appointmentController.viewAppointment)
router.get("/history",auth,role("counsellor"),appointmentController.appHistory)





module.exports=router