import { ConsultationModel } from "../models/consultationSchema.js";

export const consultationController={
    async saveAndRedirect(req,res){
        const {symptoms,diagnosis,tests,medicines,advice,followUpDate,docId,userId}=req.body;

        try {
            const obj=await ConsultationModel.create({
                symptoms,diagnosis,tests,medicines,advice,followUpDate,docId,userId,
                date:(new Date())
            })

            res.status(200).send({
                symptoms,diagnosis,tests,medicines,advice,followUpDate,docId,userId
            })
 
        } catch (error) {
            console.log(error)
            res.status(500).send("failed");
        }
    },
    async getAll(req,res){
        const {userId}=req.body

        try {
            const obj=await ConsultationModel.find({userId})
            res.status(200).send(obj)

        } catch (error) {
            res.status(500).send("failed");
        }
    }
}