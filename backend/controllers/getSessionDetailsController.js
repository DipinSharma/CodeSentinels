import { DoctorModel } from "../models/doctorSchema.js";
import { SessionModel } from "../models/sessionSchema.js";
import {UserModel} from "../models/userSchema.js"

export const getDetails = {
    async getUserSessions(req, res) {
        const { userId } = req.body;

        try {
            const sessions = await SessionModel.find({ userId });
            const obj = await Promise.all(sessions.map(async (session) => {
                const doctor = await DoctorModel.findOne({ _id: session.docId });
                return {
                    ...session._doc, 
                    docName: doctor ? doctor.name : "Unknown Doctor" 
                };
            }));
            // console.log(obj);
            res.status(200).send(obj);
        } catch (error) {
            console.error(error);
            res.status(500).send("failed");
        }
    },
    async getPatientDetails(req, res) {
        const { docId } = req.body;
    
        try {
            let sessions = await SessionModel.find({ docId });

        // Convert each session to a plain object and add the userName attribute
        sessions = await Promise.all(sessions.map(async session => {
            let user = await UserModel.findOne({ _id: session.userId });
            let sessionObj = session.toObject();  // Convert to plain JS object

            sessionObj.userName = user ? user.name : 'Unknown User';

            return sessionObj;
        }));

        res.status(200).send(sessions);
        } catch (error) {
            console.error(error);
            res.status(500).send("Failed to fetch patient details");
        }
    }
};