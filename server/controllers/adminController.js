import jwt from "jsonwebtoken";
import bcrypt from "bcryptjs";
import Recipe from "../models/Recipe.js";
import Comment from "../models/Comment.js";
import User from "../models/User.js";

export const adminRegister = async (req, res) => {
  try {
    const { name, email, password } = req.body;
    if (!name || !email || !password) {
      return res.json({ success: false, message: "Missing Details" });
    }

    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.json({ success: false, message: "User already exists" });
    }

    const hashedPassword = await bcrypt.hash(password, 10);
    const user = await User.create({
      name,
      email,
      password: hashedPassword,
    });
    const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, {
      expiresIn: "7d",
    });
    return res.json({
      success: true,
      token,
      user: { email: user.email, name: user.name },
    });
  } catch (error) {
    res.json({ success: false, message: error.message });
  }
};

export const adminLogin = async (req, res) => {
  try {
    const { email, password } = req.body;
    if (!email || !password)
      return res.json({
        success: false,
        message: "Email and Password are required",
      });

    const user = await User.findOne({ email });
    if (!user)
      return res.json({
        success: false,
        message: "Invalid username or password",
      });

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch)
      return res.json({
        success: false,
        message: "Invalid username or password",
      });

    const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, {
      expiresIn: "7d",
    });

    return res.json({
      success: true,
      token,
      message: "Login Successfully",
      user: { email: user.email, name: user.name },
    });
  } catch (error) {
    res.json({ success: false, message: error.message });
  }
};

export const getAllRecipesAdmin = async (req, res) => {
  try {
    const recipes = await Recipe.find({}).sort({ createdAt: -1 });
    res.json({ success: true, recipes });
  } catch (error) {
    res.json({ success: false, message: error.message });
  }
};

export const getAllComments = async (req, res) => {
  try {
    const comments = await Comment.find({})
      .populate("recipe")
      .sort({ createdAt: -1 });
    res.json({ success: true, comments });
  } catch (error) {
    res.json({ success: false, message: error.message });
  }
};

export const getDashboard = async (req, res) => {
  try {
    const recentRecipes = await Recipe.find({})
      .sort({ createdAt: -1 })
      .limit(5);
    const recipes = await Recipe.countDocuments();
    const comments = await Comment.countDocuments();
    const drafts = await Recipe.countDocuments({ isPublished: false });
    const dashboardData = {
      recentRecipes,
      recipes,
      comments,
      drafts,
    };
    res.json({ success: true, dashboardData });
  } catch (error) {
    res.json({ success: false, message: error.message });
  }
};

export const deleteCommentById = async (req, res) => {
  try {
    const { id } = req.body;
    await Comment.findByIdAndDelete(id);
    res.json({ success: true, message: "Comment deleted successfully" });
  } catch (error) {
    res.json({ success: false, message: error.message });
  }
};

export const approveCommentById = async (req, res) => {
  try {
    const { id } = req.body;
    await Comment.findByIdAndUpdate(id, { isApproved: true });
    res.json({ success: true, message: "Comment approved successfully" });
  } catch (error) {
    res.json({ success: false, message: error.message });
  }
};
