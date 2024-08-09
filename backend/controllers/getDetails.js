import { UserModel } from '../models/userSchema.js';
import { DoctorModel } from '../models/doctorSchema.js';

export const getAllUserDetails = async (req, res) => {
    try {
        const id = req.query.id;

        // Fetch user details by ID
        const userDetails = await UserModel.findById(id);
        // console.log(userDetails)
        // Check if user exists
        if (!userDetails) {
            return res.status(404).json({
                success: false,
                message: "User not found",
            });
        }

        // Return user details
        return res.status(200).json({
            success: true,
            message: "User data fetched successfully",
            data: userDetails,
        });

    } catch (error) {
        // Handle any errors
        return res.status(500).json({
            success: false,
            message: error.message,
        });
    }
};

export const getDetailsOfADoctor = async (req, res) => {
    try {
        const id = req.query.id;

        // Fetch doctor details by ID
        const doctorDetails = await DoctorModel.findById(id);
        // console.log(doctorDetails)
        // Check if doctor exists
        if (!doctorDetails) {
            return res.status(404).json({
                success: false,
                message: "Doctor not found",
            });
        }

        // Return doctor details
        return res.status(200).json({
            success: true,
            message: "Doctor data fetched successfully",
            data: doctorDetails,
        });

    } catch (error) {
        // Handle any errors
        return res.status(500).json({
            success: false,
            message: error.message,
        });
    }
};
