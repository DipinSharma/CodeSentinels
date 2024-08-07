import bcrypt from 'bcrypt';
import { UserModel } from '../models/userSchema.js';
import { DoctorModel } from '../models/doctorSchema.js';
import { AvailabilityModel} from "../models/availablitySchema.js"
export const signUp = async (req, res) => {
    try {
        const {
            name, email, password, confirmPassword,
            phoneNumber, gender, age
        } = req.body;

        if (!name || !email || !password || !confirmPassword || !phoneNumber || !gender || !age) {
            return res.status(403).json({
                success: false,
                message: "All fields are required",
            });
        }

        // PASSWORD ARE SAME OR NOT
        if (password !== confirmPassword) {
            return res.status(400).json({
                success: false,
                message: "Password and confirmPassword does not match",
            });
        }

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
        const user = await User.create({
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
            message: "Dpctor cannot be registered. Please try again"
        });
    }
}

