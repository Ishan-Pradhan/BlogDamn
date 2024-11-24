import { comparePassword } from "../helpers/authHelper.js";
import { User } from "../models/User.models.js";
import { uploadOnCloudinary } from "../utils/cloudinary.js";
import { generateAccessToken, generateRefreshToken } from "../utils/token.js";
import JWT from "jsonwebtoken";

const registerController = async (req, res) => {
  try {
    console.log("Request Body:", req.body);
    console.log("Uploaded File:", req.file);

    const { name, username, email, password } = req.body;

    // console.log(name, username, email, password);

    if (
      [name, username, email, password].some((field) => field.trim() === "")
    ) {
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
      name,
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
        name: user.name,
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

export { registerController, loginController, getUserById, allUsers };
