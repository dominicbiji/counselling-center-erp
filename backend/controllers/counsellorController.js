const Counsellor=require("../model/counsellor")
const User=require("../model/user")
const bcrypt=require("bcrypt")

const addCounsellor= async (req,res)=>{
    try{
        const {name,email,password,phone,specialization,
            qualification,experience,status,}=req.body
            
            const hashedPassword=await bcrypt.hash(password,10)
            const user=new User({
                name:name,
                password:hashedPassword,
                email:email,
                role:"counsellor"
            })
            await user.save()

            const counsellor=new Counsellor({
                name: name,
                email: email,
                phone: phone,
                specialization: specialization,
                qualification: qualification,
                experience: experience,
                status: status,
                userId: user._id
            })
            await counsellor.save()
            res.status(200).send("counsellor added successfully")
                
    }catch(error){
        console.log(error)
    }
}

const getCounsellor=async(req,res)=>{
    try{
        const response=await Counsellor.find()
        res.send(response)
    }catch(error){
        console.log(error)
    }
    
}

const updateCounsellor=async (req,res)=>{
    try{
        const{id}=req.params
        const{name, email, phone, specialization,
             qualification, experience, status, userId}=req.body

             await Counsellor.findByIdAndUpdate(id,{
                name, email, phone, specialization,
                 qualification, experience, status, userId
             })
             res.status(200).send("counsellor deatils updated successfully")
    }catch(error){
        console.log(error)
    }
}

const deleteCounsellor=async(req,res)=>{
    try{
         const {id}=req.params
    await Counsellor.findByIdAndDelete(id)
    res.status(200).send("counsellor deleted successfully")
    }catch(error){
        console.log(error)
    }
   
}

const viewCounsellor=async(req,res)=>{
    try{
        const {id}=req.params
        const response=await Counsellor.findById(id)
        res.send(response)
    }catch(error){
        console.log(error)
    }
}

module.exports={addCounsellor,getCounsellor,updateCounsellor,deleteCounsellor,viewCounsellor}