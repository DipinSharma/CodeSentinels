import bcrypt from 'bcrypt';
import { UserModel } from '../models/userSchema.js';
import { DoctorModel } from '../models/doctorSchema.js';
import { AvailabilityModel} from "../models/availablitySchema.js"
// import { JsonWebTokenError } from 'jsonwebtoken';
import jwt from 'jsonwebtoken';
export const signUp = async (req, res) => {
    try {
        const {
            name, email, password, confirmPassword,
            phoneNumber, gender, age
        } = req.body;

        if (!name || !email || !password  || !phoneNumber || !gender || !age) {
            return res.status(403).json({
                success: false,
                message: "All fields are required",
            });
        }

        // PASSWORD ARE SAME OR NOT
        // if (password !== confirmPassword) {
        //     return res.status(400).json({
        //         success: false,
        //         message: "Password and confirmPassword does not match",
        //     });
        // }

        // Check if user exists or not
        const existingUser = await UserModel.findOne({ email });
        if (existingUser) {
            return res.status(400).json({
                success: false,
                message: "User already exists"
            });
        }

        // Hash Password
        const hashPassword = await bcrypt.hash(password, 10);
        const user = await UserModel.create({
            name, email, password: hashPassword, phoneNumber, gender, age
        });

        res.status(200).json({
            success: true,
            message: "User is registered successfully",
            user
        });
    } catch (error) {
        console.log(error);
        res.status(500).json({
            success: false,
            message: "User cannot be registered. Please try again"
        });
    }
};

export const doctorSignUp = async(req,res) =>{
    try{
        const {
            name, email, password,
            phoneNumber, gender, age,licenseNumber,yearsOfExperience,availability
        } = req.body;
        console.log("availabiltiy ",availability)
        console.log(licenseNumber);
        if (!name || !email || !password  || !phoneNumber || !gender || !age) {
            return res.status(403).json({
                success: false,
                message: "All fields are required",
            });
        }

        const existingUser = await DoctorModel.findOne({ email });
        if (existingUser) {
            return res.status(400).json({
                success: false,
                message: "Doctor already exists"
            });
        }
        const hashPassword = await bcrypt.hash(password, 10);
        // const availabilityData={
        //     timeSlots:availability,
        // }
        // const available=await AvailabilityModel.create({
        //     availabilityData
        // })
        const available = await AvailabilityModel.create({
            timeSlots: availability
        });
        console.log("available, ",available);
        const doctor=await DoctorModel.create({
            name, email, password: hashPassword, phoneNumber, gender, age,licenseNumber,yearsOfExperience,availability:available._id
        })


        res.status(200).json({
            success: true,
            message: "Doctor is registered successfully",
            doctor
        });
    }catch(error){
        console.log(error);
        res.status(500).json({
            success: false,
            message: "Doctor cannot be registered. Please try again"
        });
    }
}

export const login=async(req,res)=>{
    try{
        // get data from req body
         const {email,password}=req.body;

        // validation
        if(!email || !password){
            return res.status(403).json({
                success:false,
                message:"All fields are required",
            })
        } 
        // user exist or not
        const user=await UserModel.findOne({email});
        if(!user){
            return res.status(401).json({
                success:false,
                message:"User is not registered,Please signup first"
            })
        }
        const payload={
            email:user.email,
            id:user._id,
            // accountType:user.accountType,
        }
        // generate jwt,after password matching
        if(await bcrypt.compare(password,user.password)){
            const token=jwt.sign(payload,process.env.JWT_SECRET,{
                expiresIn:"2h",
            })
            user.token=token;
            user.password=undefined;
       
            const options={
                expires:new Date(Date.now()+3*24*60*60*1000),
                httpOnly:true,
            }
            res.cookie("token",token,options).json({
                success:true,
                token,
                user,
                message:"Logged In Successfully"
            })
            // create cookie and send response
    
        }
        else{
            return res.status(401).json({
                success:false,
                message:"Password is incorrect"
            })
        }
       
    }catch(error){
        console.log(error);
        return res.status(500).json({
            success:false,
            message:"Login failure please try again"
        })
    }
}


export const doctorLogin=async(req,res)=>{
    try{
        // get data from req body
         const {email,password}=req.body;

        // validation
        if(!email || !password){
            return res.status(403).json({
                success:false,
                message:"All fields are required",
            })
        } 
        // user exist or not
        const user=await DoctorModel.findOne({email});
        if(!user){
            return res.status(401).json({
                success:false,
                message:"User is not registered,Please signup first"
            })
        }
        const payload={
            email:user.email,
            id:user._id,
            // accountType:user.accountType,
        }
        // generate jwt,after password matching
        if(await bcrypt.compare(password,user.password)){
            const token=jwt.sign(payload,process.env.JWT_SECRET,{
                expiresIn:"2h",
            })
            user.token=token;
            user.password=undefined;
       
            const options={
                expires:new Date(Date.now()+3*24*60*60*1000),
                httpOnly:true,
            }
            res.cookie("token",token,options).json({
                success:true,
                token,
                user,
                message:"Logged In Successfully"
            })
            // create cookie and send response
    
        }
        else{
            return res.status(401).json({
                success:false,
                message:"Password is incorrect"
            })
        }
       
    }catch(error){
        console.log(error);
        return res.status(500).json({
            success:false,
            message:"Login failure please try again"
        })
    }
}


