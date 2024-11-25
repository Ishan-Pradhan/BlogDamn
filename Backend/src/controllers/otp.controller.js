import dotenv from "dotenv";
dotenv.config();

import nodemailer from "nodemailer";
import OTP from "../models/OTP.js"; // OTP model
import crypto from "crypto"; // For generating random OTP

// Function to generate a 6-digit OTP
const generateOTP = () => {
  return Math.floor(100000 + Math.random() * 900000).toString();
};

// Controller to generate and send OTP
const generateOtpController = async (req, res) => {
  const { email } = req.body; // User's email to send OTP

  try {
    // Check if the email is already registered (optional, can skip if it's only for verification)
    // const existingUser = await User.findOne({ email });
    // if (!existingUser) {
    //   return res.status(400).json({ success: false, message: 'Email not registered' });
    // }

    await OTP.deleteOne({ email });

    // Generate OTP
    const otp = generateOTP();

    // Generate OTP

    // Save OTP to DB with expiration time
    const otpRecord = new OTP({
      email,
      otp,
    });
    await otpRecord.save();

    // Set up Nodemailer transport
    const transporter = nodemailer.createTransport({
      service: "gmail", // Using Gmail's SMTP service
      auth: {
        user: process.env.EMAIL, // Your email
        pass: process.env.EMAIL_PASSWORD, // Your email app password
      },
    });

    // Prepare email content
    const mailOptions = {
      from: process.env.EMAIL,
      to: email,
      subject: "Your OTP Code",
      text: `Your OTP code is: ${otp}`,
    };

    // Send the OTP email
    await transporter.sendMail(mailOptions);

    res.status(200).json({ success: true, message: "OTP sent successfully!" });
  } catch (error) {
    console.error("Error in generating OTP:", error);
    res.status(500).json({ success: false, message: "Error sending OTP" });
  }
};

// Controller to verify OTP
const verifyOtpController = async (req, res) => {
  const { email, otp } = req.body; // OTP entered by user

  try {
    // Find OTP record in DB
    const otpRecord = await OTP.findOne({ email });

    if (!otpRecord) {
      return res.status(400).json({ success: false, message: "OTP not found" });
    }

    // Check if OTP has expired
    console.log(new Date().toISOString());
    console.log(otpRecord.expireAt);
    if (new Date().toISOString() > otpRecord.expireAt) {
      return res.status(400).json({ success: false, message: "OTP expired" });
    }

    console.log(otpRecord.otp);
    console.log(otp);

    // Check if OTP is correct
    if (otpRecord.otp !== otp) {
      return res.status(400).json({ success: false, message: "Invalid OTP" });
    }

    // OTP is valid
    res
      .status(200)
      .json({ success: true, message: "OTP verified successfully!" });
  } catch (error) {
    console.error("Error in verifying OTP:", error);
    res.status(500).json({ success: false, message: "Server error" });
  }
};

export { generateOtpController, verifyOtpController };
