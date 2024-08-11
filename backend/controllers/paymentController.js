import { SessionModel } from "../models/sessionSchema.js";
import { processPayment } from "../utils/paymentHandler.js";
import crypto from 'crypto';
export const paymentController = {
    async paymentProcess(req, res) {
        const { token, amount, docId, userId, startTime, endTime, day } = req.body;

        try {
            const paymentResult = await processPayment(token, amount);

            if (paymentResult && paymentResult.payment) {
                const sanitizedPaymentResult = JSON.parse(
                    JSON.stringify(paymentResult, (key, value) =>
                        typeof value === 'bigint' ? value.toString() : value
                    )
                );

                if (sanitizedPaymentResult.payment.id) {
                    const sessionId = crypto.randomBytes(16).toString('base64').slice(0, 16).replace(/[/+]/g, '');
                    const obj=await SessionModel.create({ docId, userId, startTime, endTime, day, sessionId });
                    sanitizedPaymentResult.sessionId=sessionId;
                    console.log(sanitizedPaymentResult)
                    return res.status(200).json(sanitizedPaymentResult);
                }
            }
            res.status(500).send("Failed");
        } catch (error) {
            console.log(error)
            res.status(500).json({ error: error.message });
        }
    }
}