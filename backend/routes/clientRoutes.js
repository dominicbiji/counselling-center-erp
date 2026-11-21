const router=require("express").Router()
const clientController=require("../controllers/clientController")
const authMiddleware=require("../middleware/authMiddleware")
const roleMiddleware=require('../middleware/roleMiddleware')

router.post("/create",authMiddleware,roleMiddleware("admin","receptionist"),clientController.createClient)
router.get("/read",authMiddleware,roleMiddleware("admin","receptionist"),clientController.getClient)
router.put("/:id",authMiddleware,roleMiddleware("admin","receptionist"),clientController.updateClient)
router.delete("/:id",authMiddleware,roleMiddleware("admin","receptionist"),clientController.deleteClient)
router.get("/myClients",authMiddleware,roleMiddleware("counsellor"),clientController.fetchClients)
router.get("/account",authMiddleware,roleMiddleware("client","admin"),clientController.clientAcc)

module.exports=router