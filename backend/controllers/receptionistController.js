const Receptionist= require("../model/receptionist")
const User=require("../model/user")
const bcrypt=require("bcrypt")

const addReceptionist=async (req,res)=>{
    try{
        const {name,password,phone,qualification,email,status}=req.body

        const hashedPassword=await bcrypt.hash(password,10)
        const user= new User({
            name:name,
            email:email,
            password:hashedPassword,
            role: "receptionist"
        })
         await user.save()
        const receptionist=new Receptionist({
            name:name,
            email:email,
            phone:phone,
            qualification:qualification,
            status:status,
            userId:user._id
        })
         await receptionist.save()
        res.status(200).send("receptionist added successfully")
    }catch(error){
        console.log(error)
    }
}

const getReceptionist=async(req,res)=>{
    try{
        const response= await Receptionist.find()
        res.send(response)
    }catch(error){
        console.log(error)
    }
}

const updateReceptionist=async(req,res)=>{
    try{
        const {id}=req.params
        const {name,email,phone,qualification,status}=req.body
        const response=await Receptionist.findByIdAndUpdate(id,{
            name:name,
            email:email,
            phone:phone,
            qualification:qualification,
            status:status
        })
        res.status(200).send("details updated successfully")
    }catch(error){
        console.log(error)
    }
}

const deleteReceptionist=async (req,res)=>{
    try{
        const {id}=req.params
        await Receptionist.findByIdAndDelete(id)
        res.status(200).send("receptionist deleted successfully")
    }catch(error){
        console.log(error)
    }
}

const viewReceptionist=async (req,res)=>{
    try{
        const {id}=req.params
        const response=await Receptionist.findById(id)
        res.status(200).send(response)
    }catch(error){
        console.log(error)
    }
}

module.exports={getReceptionist,addReceptionist,updateReceptionist,deleteReceptionist,viewReceptionist}