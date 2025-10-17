import express from "express";
import {
  addComment,
  addRecipe,
  deleteRecipeById,
  getAllRecipes,
  getRecipeById,
  getRecipeComments,
  togglePublish,
} from "../controllers/recipeController.js";
import upload from "../middleware/multer.js";
import auth from "../middleware/auth.js";

const recipeRouter = express.Router();

recipeRouter.post("/add", upload.single("image"), auth, addRecipe);
recipeRouter.get("/all", getAllRecipes);
recipeRouter.get("/:recipeId", getRecipeById);
recipeRouter.post("/delete", auth, deleteRecipeById);
recipeRouter.post("/toggle-publish", auth, togglePublish);
recipeRouter.post("/add-comment", addComment);
recipeRouter.get("/comments", getRecipeComments);

export default recipeRouter;
