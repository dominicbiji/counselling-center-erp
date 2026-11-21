const Notification=require("../model/notification")
const User=require("../model/user")


const getNotification=async (req,res)=>{
    try{
        const notifications=await Notification.find({userId:req.userId}).sort({createdAt:-1})
        res.status(200).json(notifications)
    }catch(error){
        console.log(error)
        res.status(500).json({message:"cannot fetch the notifications"})
    }
}

const markAsRead=async (req,res)=>{
    try{
        const {id}=req.params
        const updatedNot=await Notification.findOneAndUpdate({_id:id,userId:req.userId},
            {isRead:true},
            {returnDocument:"after"}
        )
        if(!updatedNot){
            return res.status(404).json({message:"notification not found"})
        }
        return res.status(200).json(updatedNot)
    }catch(error){
        console.log(error)
         return res.status(500).json({message:"cannot update notification"})
    }
}

const createNotification=async (req,res)=>{
    try{
        const { userId, title, message, type, link } = req.body

        if (!userId || !title || !message) {
            return res.status(400).json({
                message: "userId, title and message are required"
            })
        }
        const notification = new Notification({
            userId,
            title,
            message,
            type: type || "general",
            link: link || ""
        })
        
        await notification.save()

        return res.status(201).json({
            message: "Notification created successfully",
            notification
        })
    }catch(error){
        console.log(error)
         return res.status(500).json({
            message: "Cannot create notification"
        })
    }
}

module.exports={getNotification,markAsRead,createNotification}