import mongoose from "mongoose";

const otpSchema = new mongoose.Schema({
  email: { type: String, required: true },
  otp: { type: String, required: true },
  expireAt: { type: Date, default: Date.now, index: { expires: 3600 } }, //1hr
});

export default mongoose.model("OTP", otpSchema);
