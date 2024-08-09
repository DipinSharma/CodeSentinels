import { processPayment } from "../utils/paymentHandler.js";

export const paymentController={
    async paymentProcess(req,res){
        const { token, amount } = req.body;

        try {
            const paymentResult = await processPayment(token, amount);
            
            if (paymentResult && paymentResult.payment) {
                // Convert any BigInt values to string using JSON.stringify with a replacer function
                const sanitizedPaymentResult = JSON.parse(
                  JSON.stringify(paymentResult, (key, value) =>
                    typeof value === 'bigint' ? value.toString() : value
                  )
                );

                return res.status(200).json(sanitizedPaymentResult);
            }
            res.status(500).send("Failed");
        } catch (error) {
            console.log(error)
            res.status(500).json({ error: error.message });
        }
    }
}