const router=require("express").Router()
const authController=require("../controllers/authController")
const authMiddleware=require("../middleware/authMiddleware")
const roleMiddleware=require("../middleware/roleMiddleware")

router.post("/register",authController.userRegister)
router.post("/login",authController.userLogin)
router.post("/forgot-password", authController.forgotPassword)
router.get("/profile",authMiddleware,authController.userProfile)
router.get("/admin",authMiddleware,roleMiddleware("admin"))
router.get("/counsellor",authMiddleware,roleMiddleware("admin,counsellor"))
router.post("/reset-password", authController.resetPassword)

    

module.exports=router