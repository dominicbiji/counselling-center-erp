const mongoose=require("mongoose")

const connectDB= ()=>mongoose.connect(process.env.MONGO_URI)
.then(()=>{
    console.log("db connected successfully")
})
.catch((error)=>{
    console.log(error)
})

module.exports=connectDB