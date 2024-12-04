import { User } from "../models/User.models.js";

// Follow a user
export const followUser = async (req, res) => {
  const { id: targetUserId } = req.params; // User to follow
  const currentUserId = req.user.userId; // Logged-in user

  if (currentUserId === targetUserId) {
    return res.status(400).json({ message: "You cannot follow yourself." });
  }

  try {
    const targetUser = await User.findById(targetUserId);
    const currentUser = await User.findById(currentUserId);

    if (!targetUser) {
      return res.status(404).json({ message: "User not found." });
    }

    // Prevent duplicate follow
    if (currentUser.following.includes(targetUserId)) {
      return res
        .status(400)
        .json({ message: "You are already following this user." });
    }

    // Update the following and followers arrays
    currentUser.following.push(targetUserId);
    targetUser.followers.push(currentUserId);

    await currentUser.save();
    await targetUser.save();

    res.status(200).json({ message: "Successfully followed the user." });
  } catch (error) {
    res.status(500).json({ error: "Something went wrong." });
    console.log(error);
  }
};

// Unfollow a user
export const unfollowUser = async (req, res) => {
  const { id: targetUserId } = req.params; // User to unfollow
  const currentUserId = req.user.userId; // Logged-in user

  if (currentUserId === targetUserId) {
    return res.status(400).json({ message: "You cannot unfollow yourself." });
  }

  try {
    const targetUser = await User.findById(targetUserId);
    const currentUser = await User.findById(currentUserId);

    if (!targetUser) {
      return res.status(404).json({ message: "User not found." });
    }

    // Check if the user is actually following the target
    if (!currentUser.following.includes(targetUserId)) {
      return res
        .status(400)
        .json({ message: "You are not following this user." });
    }

    // Remove from following and followers arrays
    currentUser.following = currentUser.following.filter(
      (userId) => userId.toString() !== targetUserId
    );
    targetUser.followers = targetUser.followers.filter(
      (userId) => userId.toString() !== currentUserId
    );

    await currentUser.save();
    await targetUser.save();

    res.status(200).json({ message: "Successfully unfollowed the user." });
  } catch (error) {
    res.status(500).json({ error: "Something went wrong." });
  }
};

// Get the followers of a user
export const getFollowers = async (req, res) => {
  const { id: userId } = req.params;

  try {
    const user = await User.findById(userId).populate(
      "followers",
      "username avatar"
    );
    if (!user) {
      return res.status(404).json({ message: "User not found." });
    }

    res.status(200).json({ followers: user.followers });
  } catch (error) {
    res.status(500).json({ error: "Something went wrong." });
  }
};

// Get the users someone is following
export const getFollowing = async (req, res) => {
  const { id: userId } = req.params;

  try {
    const user = await User.findById(userId).populate(
      "following",
      "username avatar"
    );
    if (!user) {
      return res.status(404).json({ message: "User not found." });
    }

    res.status(200).json({ following: user.following });
  } catch (error) {
    res.status(500).json({ error: "Something went wrong." });
  }
};
