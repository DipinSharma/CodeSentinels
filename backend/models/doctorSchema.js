import { mongoose ,Schema} from "mongoose";
const doctorSchema = new mongoose.Schema({
    "name": {
        type: Schema.Types.String,
        required: true
    },
    "email": {
        type: Schema.Types.String,
        required: true,
        unique: true
    },
    "password": {
        type: Schema.Types.String,
        required: true,
        min: true
    },
    "phoneNumber": {
        type: Schema.Types.Number,
        required: true,
        length: 10
    },
    "gender": {
        type: Schema.Types.String,
        required: true,
        enum: ["male", "female"]
    },
    "age": {
        type: Schema.Types.Number,
        required: true
    },
    "licenseNumber":{
        type:Schema.Types.String,
        required:true
    },
    "yearsOfExperience":{
        type:Schema.Types.Number,
        required:true
    },
    "availability":{
        type:Schema.Types.ObjectId,
        ref:'availabilityModel',
        required:true
    }
})
export const DoctorModel=mongoose.model('doctors',doctorSchema);