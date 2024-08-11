import { mongoose, Schema } from "mongoose";
import { emailTemplate } from "../template/email.js";
import { mailSender } from "../utils/mailSender.js"; // Assuming you have a mailSender utility

const bookedSchema = new mongoose.Schema({
    doctorEmail: {
        type: mongoose.Schema.Types.String,
        required: true,
    },
    userEmail: {
        type: mongoose.Schema.Types.String,
        required: true,
    },
    userName: {
        type: mongoose.Schema.Types.String,
        required: true,
    },
    doctorName: {
        type: mongoose.Schema.Types.String,
        required: true,
    },
    day: {
        type: mongoose.Schema.Types.String,
        required: true,
    },
    start: {
        type: mongoose.Schema.Types.Date,
        required: true,
    },
    end: {
        type: mongoose.Schema.Types.Date,
        required: true,
    }
});

async function sendVerificationEmail(email, appointmentDetails) {
    try {
        appointmentDetails.link="http://localhost:3000/videoChat"
        const mailResponse = await mailSender(
            email,
            "Appointment Confirmation",
            emailTemplate(appointmentDetails)
        );
        console.log("Email sent successfully to:", email, mailResponse.response);
    } catch (error) {
        console.log("Error occurred while sending email to:", email, error);
        throw error;
    }
}

// Define a post-save hook to send emails after the document has been saved
bookedSchema.pre("save", async function (next) {
    console.log("New document saved to database");

    if (this.isNew) {
        // Prepare details for the doctor
        const doctorDetails = {
            name: this.doctorName,
            date: this.day,
            time: `${this.start} - ${this.end}`,
            doctorName: this.userName, // Send userName to the doctor
        };

        // Prepare details for the user
        const userDetails = {
            name: this.userName,
            date: this.day,
            time: `${this.start} - ${this.end}`,
            doctorName: this.doctorName, // Send doctorName to the user
        };

        // Send email to the doctor
        await sendVerificationEmail(this.doctorEmail, doctorDetails);
        // Send email to the user
        await sendVerificationEmail(this.userEmail, userDetails);
    }
    next();
});

export const bookedModel = mongoose.model('booked', bookedSchema);
