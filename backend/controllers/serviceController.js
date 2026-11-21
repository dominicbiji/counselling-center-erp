const Service=require("../model/service")

const createService=async (req,res)=>{
    try{
        const {name,description,fee}=req.body
        if(fee===undefined||fee===null||typeof fee!=="number"||fee<0||!Number.isFinite(fee)){
            return res.status(400).json({message:"invalid fee"})
        }
        if(typeof name!=="string"||name.trim()===""){
            return res.status(400).json({message:"invalid name"})
        }
        const service=new Service({
            name,
            description,
            fee
        })
        await service.save()
        return res.status(201).send(service)
    }catch(error){
        console.log(error)
        return res.status(500).json({message:"failed to create service"})
    }
}

const getServices=async (req,res)=>{
    try{
        const response= await Service.find()
        res.status(200).send(response)
    }catch(error){
        console.log(error)
        return res.status(500).json({message:"failed to get services"})
    }
}

const getActiveServices=async (req,res)=>{
    try{
        const response= await Service.find({isActive:true})
        res.status(200).send(response)
    }catch(error){
        console.log(error)
        return res.status(500).json({message:"failed to get services"})
    }
}

const updateServices=async (req,res)=>{
    try{
        const {id}=req.params
        const {name,description,fee,isActive}=req.body

        if (Object.keys(req.body).length === 0) {
        return res.status(400).json({
            message: "Request body cannot be empty"
        })
}
         if (isActive!== undefined &&
            typeof isActive !== "boolean"){
            return res.status(400).json({
                message: "isActive must be a boolean"
            });
        }
        

        const updates={}
        if(name!==undefined)updates.name=name
        if (description !== undefined) updates.description = description
        if (fee !== undefined) updates.fee = fee
        if (isActive !== undefined) updates.isActive = isActive

        const response=await Service.findByIdAndUpdate(id,
           updates
        ,{returnDocument:"after",runValidators:true})

        if (!response) {
    return res.status(404).json({
        message: "Service not found"
    })
}
        return res.status(200).json(response)
    }catch(error){
        console.log(error)
         if (error.name==="ValidationError"||error.name === "CastError"){
        
        
        return res.status(400).json({
            message: error.message
        })
    }

        return res.status(500).json({message:"failed to update services"})
    }
}

module.exports={createService,getServices,updateServices,getActiveServices}