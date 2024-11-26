import dotenv from "dotenv";
dotenv.config();

import nodemailer from "nodemailer";
import OTP from "../models/OTP.js"; // OTP model
import crypto from "crypto"; // For generating random OTP
import { User } from "../models/User.models.js";

// Function to generate a 6-digit OTP
const generateOTP = () => {
  return Math.floor(100000 + Math.random() * 900000).toString();
};

// Controller to generate and send OTP
const generateOtpController = async (req, res) => {
  const { email, purpose } = req.body; // Add 'purpose'

  try {
    // Validate purpose
    if (!["verification", "password-reset"].includes(purpose)) {
      return res
        .status(400)
        .json({ success: false, message: "Invalid purpose" });
    }

    await OTP.deleteMany({ email, purpose }); // Delete old OTPs for this purpose

    const otp = generateOTP(); // Generate OTP
    const otpRecord = new OTP({ email, otp, purpose }); // Save with purpose
    await otpRecord.save();

    const mailOptions = {
      from: process.env.EMAIL,
      to: email,
      subject: `Your OTP for ${purpose}`,
      text: `Your OTP code for ${purpose} is: ${otp}. This will expire in 10 minutes.`,
    };

    await nodemailer
      .createTransport({
        service: "gmail",
        auth: { user: process.env.EMAIL, pass: process.env.EMAIL_PASSWORD },
      })
      .sendMail(mailOptions);

    res.status(200).json({ success: true, message: "OTP sent successfully" });
  } catch (error) {
    console.error("Error in generating OTP:", error);
    res.status(500).json({ success: false, message: "Error sending OTP" });
  }
};

// Controller to verify OTP
const verifyEmailController = async (req, res) => {
  const { email, otp } = req.body;

  try {
    const otpRecord = await OTP.findOne({ email, purpose: "verification" });
    if (
      !otpRecord ||
      otpRecord.otp !== otp ||
      otpRecord.expireAt < new Date().toISOString()
    ) {
      return res
        .status(400)
        .json({ success: false, message: "Invalid or expired OTP" });
    }

    const user = await User.findOne({ email });
    if (!user) {
      return res
        .status(400)
        .json({ success: false, message: "User not found" });
    }

    user.verified = true;
    await user.save();
    await OTP.deleteOne({ email, purpose: "verification" });

    res
      .status(200)
      .json({ success: true, message: "Email verified successfully" });
  } catch (error) {
    console.error("Error in verifying email:", error);
    res.status(500).json({ success: false, message: "Server error" });
  }
};

export { generateOtpController, verifyEmailController };
