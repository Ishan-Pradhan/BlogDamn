import { User } from "../models/User.models.js";
import { generateAccessToken, generateRefreshToken } from "../utils/token.js";

const registerController = async (req, res) => {
  try {
    const { name, username, email, password } = req.body;

    console.log(name, username, email, password);

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

    const newUser = new User({ name, username, email, password });
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

export default registerController;
