import { comparePassword } from "../helpers/authHelper.js";
import OTP from "../models/OTP.js";
import { User } from "../models/User.models.js";
import { uploadOnCloudinary } from "../utils/cloudinary.js";
import { generateAccessToken, generateRefreshToken } from "../utils/token.js";
import { generateOtpController } from "./otp.controller.js";

const registerController = async (req, res) => {
  try {
    console.log("Request Body:", req.body);
    console.log("Uploaded File:", req.file);

    const { username, email, password } = req.body;

    // console.log(name, username, email, password);

    if ([username, email, password].some((field) => field.trim() === "")) {
      return res
        .status(400)
        .send({ success: false, message: "All fields are required" });
    }

    const existingUser = await User.findOne({ $or: [{ email }, { username }] });
    if (existingUser) {
      return res
        .status(400)
        .send({ success: false, message: "Email or username already in use" });
    }

    const avatarLocalPath = req.files?.avatar[0]?.path;

    if (!avatarLocalPath)
      return res.status(400).send({ message: "avatar is required" });

    const avatarImage = await uploadOnCloudinary(avatarLocalPath);

    const newUser = new User({
      avatar: avatarImage.url,

      username,
      email,
      password,
    });
    await newUser.save();

    const accessToken = generateAccessToken(newUser);
    const refreshToken = generateRefreshToken(newUser);

    newUser.refreshTokens.push(refreshToken);
    await newUser.save();

    res.status(201).json({
      message: "User registered successfully",
      accessToken,
      refreshToken,
    });
  } catch (error) {
    console.error("Error during registration:", error);
    res.status(500).json({ message: "Internal server error" });
  }
};

const loginController = async (req, res) => {
  try {
    const { email, password } = req.body;
    const user = await User.findOne({ email });

    if (!user) {
      return res.status(400).json({
        success: false,
        message: "Email or password is wrong",
      });
    }

    const match = await comparePassword(password, user.password);
    console.log(match);

    if (!match) {
      return res
        .status(400)
        .send({ success: false, message: "email or password is wrong" });
    }

    const accessToken = generateAccessToken(user);
    const refreshToken = generateRefreshToken(user);

    user.refreshTokens.push(refreshToken);
    await user.save();

    return res.status(200).send({
      success: true,
      message: "Login Success",
      user: {
        avatar: user.avatar,
        username: user.username,
        email: user.email,
        role: user.role,
      },
      accessToken,
      refreshToken,
    });
  } catch (error) {
    res.status(400).send({ success: false, message: "Login failed" });
  }
};

const forgotPasswordController = async (req, res) => {
  const { email } = req.body;

  try {
    const user = await User.findOne({ email });
    if (!user) {
      return res
        .status(400)
        .json({ success: false, message: "Email not registered" });
    }

    req.body.purpose = "password-reset"; // Indicate OTP purpose
    await generateOtpController(req, res); // Reuse OTP generation logic
  } catch (error) {
    console.error("Error in forgot password:", error);
    res.status(500).json({ success: false, message: "Server error" });
  }
};

const resetPasswordController = async (req, res) => {
  const { email, otp, newPassword } = req.body;

  try {
    const otpRecord = await OTP.findOne({ email, purpose: "password-reset" });
    if (
      !otpRecord ||
      otpRecord.otp !== otp ||
      otpRecord.expireAt < new Date()
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

    user.password = newPassword; // Hashing handled in `pre("save")` middleware
    await user.save();
    await OTP.deleteOne({ email, purpose: "password-reset" });

    res
      .status(200)
      .json({ success: true, message: "Password reset successfully" });
  } catch (error) {
    console.error("Error in resetting password:", error);
    res.status(500).json({ success: false, message: "Server error" });
  }
};

// const googleCallbackController = async (req, res) => {
//   try {
//     const user = req.user; // Passport injects `user` into the request object.

//     // Generate JWT tokens
//     const accessToken = generateAccessToken(user);
//     const refreshToken = generateRefreshToken(user);

//     // Optionally, save refresh token to the user document
//     user.refreshTokens = user.refreshTokens || [];
//     user.refreshTokens.push(refreshToken);
//     await user.save();

//     // Send response back to the client
//     res.status(200).json({
//       success: true,
//       message: "Google Sign-In Successful",
//       user: {
//         avatar: user.avatar,
//         name: user.name,
//         email: user.email,
//         role: user.role || "user",
//       },
//       accessToken,
//       refreshToken,
//     });
//   } catch (error) {
//     console.error("Error in Google callback:", error);
//     res
//       .status(500)
//       .json({ success: false, message: "Google Authentication failed" });
//   }
// };

const allUsers = async (req, res) => {
  try {
    const users = await User.find();
    console.log(users);
    res.status(200).send(users);
  } catch (error) {
    console.log(error);
    res.status(500).send({ success: false, message: "Internal Server Error" });
  }
};

const getUserById = async (req, res) => {
  try {
    const userId = req.params.id;
    const user = await User.findById(userId);
    if (!user) {
      return res.status(404).send({ message: "User not found" });
    }

    res.status(200).send(user);
  } catch (error) {
    res.status(500).send("internal server error");
  }
};

export {
  registerController,
  loginController,
  forgotPasswordController,
  resetPasswordController,
  getUserById,
  allUsers,
};
