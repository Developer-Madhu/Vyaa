import Razorpay from "razorpay";
import crypto from "crypto";
import "dotenv/config";
export const razorpay = new Razorpay({
    key_id: process.env.RAZORPAY_KEY_ID,
    key_secret: process.env.RAZORPAY_KEY_SECRET,
});
export function verifyPaymentSignature(orderId, paymentId, signature) {
    const expectedSign = crypto
        .createHmac("sha256", process.env.RAZORPAY_KEY_SECRET)
        .update(`${orderId}|${paymentId}`)
        .digest("hex");
    return expectedSign === signature;
}
//# sourceMappingURL=razorpay.js.map