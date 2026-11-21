const User=require("../model/user")
const bcrypt=require("bcrypt")
const jwt=require("jsonwebtoken")
const JWT_SECRET= process.env.JWT_SECRET
const crypto = require("crypto")
const sendEmail = require("../utils/sendEmail")

const userRegister= async (req,res)=>{
    try{
        const {name,email,password}=req.body
        const emailExists= await User.findOne({email})

        if(emailExists){
             return res.status(401).send("email already exists")
        }

        const hashedPassword= await bcrypt.hash(password,10)
        const user= new User({name:name,email:email,password:hashedPassword})
         await user.save()
        res.status(201).send("user registered successfully")
    }catch(error){
        console.log(error)
    }
}

const userLogin= async (req,res)=>{
    try{
        const {email,password}=req.body
        const specUser=await User.findOne({email})
        if(!specUser){
            return res.status(404).send("user not found")
        }
        const pwdMatch= await bcrypt.compare(password,specUser.password)
        if(pwdMatch){
            const authtoken=jwt.sign({userId:specUser._id},JWT_SECRET,{expiresIn:"1d"})
            res.status(200).json({success:true,message:"login successful",authtoken})
        }
        else{
            res.status(400).send("password mismatch")
        }

    }catch(error){
        console.log(error)
    }
}
const userProfile= async (req,res)=>{
    try{
        const user=req.userId
        const response= await User.findById(user)
        res.send(response)
    }catch(error){
        console.log(error)
    }
}

const forgotPassword = async (req, res) => {
    try {
        const { email } = req.body

        const user = await User.findOne({ email })

        if (!user) {
            return res.status(200).json({
                message: "If the account exists, a reset link will be sent."
            })
        }
        const resetToken = crypto.randomBytes(32).toString("hex")

        const hashedToken = crypto
            .createHash("sha256")
            .update(resetToken)
            .digest("hex")

    user.resetPasswordToken = hashedToken
    user.resetPasswordExpires = Date.now() + 15 * 60 * 1000

    await user.save()
    const resetURL = `http://localhost:5173/reset-password/${resetToken}`

    try {
    await sendEmail(
        user.email,
        "Password Reset Request",
        `<h2>Password Reset</h2>
         <p>You requested a password reset.</p>
         <p>Click the link below to reset your password:</p>
         <a href="${resetURL}">Reset Password</a>
         <p>This link expires in 15 minutes.</p>`
    )
    } catch (emailError) {
        user.resetPasswordToken = null
        user.resetPasswordExpires = null
        await user.save()
        console.error("Password reset email failed:", emailError)

    }
    return res.status(200).json({
            message: "If the account exists, a reset link will be sent."
    })

    } catch (error) {
        console.log(error)
        return res.status(500).json({
            message: "Something went wrong"
        })
    }
}


const resetPassword = async (req, res) => {
    try {
        const { token, password } = req.body

        if (!token || !password) {
            return res.status(400).json({
                message: "Token and new password are required"
            })
        }

        if (password.length < 8) {
            return res.status(400).json({
                message: "Password must be at least 8 characters"
            })
        }

        const hashedToken = crypto
            .createHash("sha256")
            .update(token)
            .digest("hex");

        const user = await User.findOne({
            resetPasswordToken: hashedToken,
            resetPasswordExpires: { $gt: Date.now() }
        });

        if (!user) {
            return res.status(400).json({
                message: "Invalid or expired reset link"
            })
        }

        const hashedPassword = await bcrypt.hash(password, 10);

        user.password = hashedPassword
        user.resetPasswordToken = null
        user.resetPasswordExpires = null

        await user.save()

        return res.status(200).json({
            message: "Password reset successful"
        })

    } catch (error) {
        console.log(error)

        return res.status(500).json({
            message: "Something went wrong"
        })
    }
}


module.exports={userRegister,userLogin,userProfile,forgotPassword,resetPassword}