import fs from "fs";
import imagekit from "../configs/imageKit.js";
import Recipe from "../models/Recipe.js";
import Comment from "../models/Comment.js";

export const addRecipe = async (req, res) => {
  try {
    const {
      title,
      category,
      description,
      ingredients,
      instructions,
      isPublished,
    } = JSON.parse(req.body.recipe);
    const imageFile = req.file;

    if (!title || !category || !description || !ingredients || !instructions) {
      return res.json({ success: false, message: "Missing required fields" });
    }

    const fileBuffer = fs.readFileSync(imageFile.path);

    const response = await imagekit.upload({
      file: fileBuffer,
      fileName: imageFile.originalname,
      folder: "/recipes",
    });

    const optimizedImageUrl = imagekit.url({
      path: response.filePath,
      transformation: [
        { quality: "auto" },
        { format: "webp" },
        { width: "1280" },
      ],
    });

    const image = optimizedImageUrl;

    await Recipe.create({
      title,
      category,
      description,
      ingredients,
      instructions,
      isPublished,
      image,
    });
    res.json({ success: true, message: "Recipe added successfully" });
  } catch (error) {
    res.json({ success: false, message: error.message });
  }
};

export const getAllRecipes = async (req, res) => {
  try {
    const recipes = await Recipe.find({ isPublished: true });
    res.json({ success: true, recipes });
  } catch (error) {
    res.json({ success: false, message: error.message });
  }
};

export const getRecipeById = async (req, res) => {
  try {
    const { recipeId } = req.params;
    const recipe = await Recipe.findById(recipeId);
    if (!recipe) {
      return res.json({ success: false, message: "Recipe Not Found" });
    }
    res.json({ success: true, recipe });
  } catch (error) {
    res.json({ success: false, message: error.message });
  }
};

export const deleteRecipeById = async (req, res) => {
  try {
    const { id } = req.body;
    await Recipe.findByIdAndDelete(id);
    await Comment.deleteMany({ recipe: id });
    res.json({ success: true, message: "Recipe deleted Successfully" });
  } catch (error) {
    res.json({ success: false, message: error.message });
  }
};

export const togglePublish = async (req, res) => {
  try {
    const { id } = req.body;
    const recipe = await Recipe.findById(id);
    recipe.isPublished = !recipe.isPublished;
    await recipe.save();
    res.json({ success: true, message: "Recipe status updated" });
  } catch (error) {
    res.json({ success: false, message: error.message });
  }
};

export const addComment = async (req, res) => {
  try {
    const { recipe, name, content } = req.body;
    await Comment.create({ recipe, name, content });
    res.json({ success: true, message: "Comment added for review" });
  } catch (error) {
    res.json({ success: false, message: error.message });
  }
};

export const getRecipeComments = async (req, res) => {
  try {
    const { recipeId } = req.body;
    const comments = await Comment.find({
      recipe: recipeId,
      isApproved: true,
    }).sort({ createdAt: -1 });
    res.json({ success: true, comments });
  } catch (error) {
    res.json({ success: false, message: error.message });
  }
};
