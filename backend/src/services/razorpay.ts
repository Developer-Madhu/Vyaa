import Razorpay from "razorpay";
import crypto from "crypto";
import "dotenv/config";

const keyId = process.env.RAZORPAY_KEY_ID || "dummy_key_id";
const keySecret = process.env.RAZORPAY_KEY_SECRET || "dummy_key_secret";

if (!process.env.RAZORPAY_KEY_ID || !process.env.RAZORPAY_KEY_SECRET) {
  console.warn("WARNING: Razorpay environment variables are missing! Using dummy fallback values to prevent server boot crash.");
}

export const razorpay = new Razorpay({
  key_id: keyId,
  key_secret: keySecret,
});

export function verifyPaymentSignature(
  orderId: string,
  paymentId: string,
  signature: string
): boolean {
  const expectedSign = crypto
    .createHmac("sha256", keySecret)
    .update(`${orderId}|${paymentId}`)
    .digest("hex");
  return expectedSign === signature;
}
