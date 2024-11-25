import mongoose from "mongoose";

const otpSchema = new mongoose.Schema({
  email: { type: String, required: true },
  otp: { type: String, required: true },
  expireAt: {
    type: Date,
    default: () => Date.now() + 3600000 + 1800000,
    index: { expires: 5400 },
  }, //1hr
});

export default mongoose.model("OTP", otpSchema);
