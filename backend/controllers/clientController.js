const Client=require("../model/client")
const Counsellor=require("../model/counsellor")
const User = require("../model/user")
const bcrypt=require("bcrypt")


const createClient=async (req,res)=>{
    try{
        const {name,password,dateOfBirth,gender,
               occupation,registrationDate,
               address,phone,email,referralSource,
               services,enquiries,counsellorId}=req.body

               const hashedPassword=await bcrypt.hash(password,10)

               const user=new User({
                 name:name,
                password:hashedPassword,
                email:email,
                role:"client"
               })
               await user.save()

                const client=new Client({
                userId:user._id,
                counsellorId:counsellorId,
                name:name,
                dateOfBirth:dateOfBirth,
                gender:gender,
                occupation:occupation,
                registrationDate:registrationDate,
                address:address,
                phone:phone,
                email:email,
                referralSource:referralSource,
                services:services,
                enquiries:enquiries
               })

               await client.save()
               res.status(200).send("client registered sucessfully")
    }catch(error){
        console.log(error)
    }
}

const getClient=async (req,res)=>{
    const response= await Client.find()
    res.send(response)

}

const updateClient= async (req,res)=>{
    const response= await Client.findByIdAndUpdate(
        req.params.id,
        req.body,
        {returnDocument:"after"}
    )
    res.send({
        message: "Client updated successfully",
        client: response
    })
}

const deleteClient= async (req,res)=>{
    await Client.findByIdAndDelete(req.params.id)
    res.send("client deleted successfully")
}

const fetchClients=async (req,res)=>{
    try{
        const counsellor= await Counsellor.findOne({userId:req.userId})
        if(!counsellor){
            return res.status(404).send("counsellor not found")
        }
        const client=await Client.find({counsellorId:counsellor._id})
        if(client.length===0){
            return res.status(404).send("cannot find any clients")
        }
        res.send(client)

    }catch(error){
        console.log(error)
    }
}

const clientAcc=async (req,res)=>{
    try{
        const client=await Client.findOne({userId:req.userId})
        if(!client){
            return res.status(404).send("client  not found")
            
        }
        res.send(client)
    }catch(error){ 
        console.log(error)
    }
}




module.exports={createClient,getClient,updateClient,deleteClient,fetchClients,clientAcc,}