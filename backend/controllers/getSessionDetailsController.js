import { DoctorModel } from "../models/doctorSchema.js";
import { SessionModel } from "../models/sessionSchema.js";
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
    }
};