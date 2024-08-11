import { ConsultationModel } from "../models/consultationSchema.js";

export const consultationController = {
    async saveAndRedirect(req, res) {
        try {
            let response = await fetch('https://codesentinels-s09j.onrender.com', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(req.body)
            })
            console.log(req.body)
            response = await response.json();
            const { doctorId, entities, userId } = response; 
            const { ADVICE, DIAGNOSIS, SYMPTOMS, TESTS } = entities;

            const obj = await ConsultationModel.create({
                symptoms: SYMPTOMS,
                diagnosis: DIAGNOSIS,
                tests: TESTS,
                advice: ADVICE, 
                // followUpDate: entities["FOLLOW-UP DATE"][0],
                docId: doctorId,
                userId,
                date: (new Date())
            })
            console.log(obj)
            res.status(200).send(obj);

        } catch (error) {
            console.log(error)
            res.status(500).send("failed");
        }
    },
    async getAll(req, res) {
        const { userId } = req.body

        try {
            const obj = await ConsultationModel.find({ userId })
            res.status(200).send(obj)

        } catch (error) {
            res.status(500).send("failed");
        }
    }
}