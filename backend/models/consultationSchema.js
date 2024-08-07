import {mongoose,Schema} from "mongoose";

const consultationSchema = new mongoose.Schema({
    "symptoms": [{
        type: mongoose.Schema.Types.String
    }],
    "diagnosis": [{
        type: mongoose.Schema.Types.String
    }],
    "tests": [{
        type: mongoose.Schema.Types.String
    }],
    "medicines": [{
        type: mongoose.Schema.Types.String
    }],
    "advice": [{
        type: mongoose.Schema.Types.String
    }],
    "followUpDate": {
        type: mongoose.Schema.Types.Date
    },
    "docId": {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'DoctorModel', 
        required: true
    },
    "userId": {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'UserModel', 
        required: true
    },
    "date":{
        type: Schema.Types.Date,
            required: true
    }
});

export const ConsultationModel = mongoose.model('Consultation', consultationSchema);
