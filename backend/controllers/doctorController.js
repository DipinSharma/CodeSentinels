import { AvailabilityModel } from "../models/availablitySchema.js";
import { DoctorModel } from "../models/doctorSchema.js";

export const doctorController={
    async getAll(req,res){
        try {
            let doctors=await DoctorModel.find({});
            let obj = [];
            const promises = doctors.map(async (i) => {
                let temp = {}; 
                temp.name = i.name;
                temp.id=i._id;
                temp.phoneNumber = i.phoneNumber;
                temp.specialty="bones";
                temp.yearsOfExperience = i.yearsOfExperience;
                temp.availability = await AvailabilityModel.findOne({ _id: i.availability });
                return temp; 
            });
            obj = await Promise.all(promises);
            res.status(200).send(obj);  
        } catch (error) {   
            res.status(500).send("failed");
        } 
    }
}