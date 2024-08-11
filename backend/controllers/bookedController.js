import { bookedModel } from "../models/bookedSchema.js";
import { DoctorModel } from "../models/doctorSchema.js";
import { UserModel } from "../models/userSchema.js";


export const bookedConsultation = async(req,res) =>{
    try{
        const {
            doctor,
            doctorId,
            startTime,
            endTime,
            userEmail,day
        }=req.body;
        const doctorInfo=await DoctorModel.find({doctorId});
        const userInfo=await UserModel.find({userEmail});

        const booking = await bookedModel.create({
            doctorEmail:doctorInfo.email,day:day,start:startTime,end:endTime,
            userEmail:userInfo.email,
            doctorName:doctorInfo.name,
            userName:userInfo.name

        })
        res.status(200).json({
            success: true,
            message: "Booking successfully",
            booking
        });

    }catch(error){
        return res.status(500).json({
            success: false,
            message: error.message,
        });
    }
}