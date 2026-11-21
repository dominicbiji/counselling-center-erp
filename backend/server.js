const express=require("express")
const app=express()
const dns = require("node:dns");
dns.setServers(["8.8.8.8", "1.1.1.1"]);
require("dotenv").config()
const connectDB=require("./config/db")
const authRoutes=require("./routes/userRoutes")
const cors=require("cors")
const clientRoutes=require("./routes/clientRoutes")
const counsellorRoutes=require("./routes/cousellorRoutes")
const receptionistRoutes=require("./routes/receptionistRoutes")
const appointmentRoutes=require("./routes/appointmentRoutes")
const adminRoutes=require("./routes/adminRoutes")
const serviceRoutes=require("./routes/serviceRoutes")
const paymentRoutes=require("./routes/paymentRoutes")
const billRoutes=require("./routes/billRoutes")
const notRoutes=require("./routes/notificationRoutes")


connectDB()
app.use(cors())
app.use(express.json())

const port=5050

app.use("/user",authRoutes)
app.use("/client",clientRoutes)
app.use("/counsellor",counsellorRoutes)
app.use("/receptionist",receptionistRoutes)
app.use("/appointment",appointmentRoutes)
app.use("/admin",adminRoutes)
app.use("/service",serviceRoutes)
app.use("/payment",paymentRoutes)
app.use("/bill",billRoutes)
app.use("/notification",notRoutes)





app.listen(port,()=>{
    console.log(`server listening at ${port}`)
})

