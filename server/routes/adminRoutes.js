import express from "express";
import {
  adminLogin,
  adminRegister,
  approveCommentById,
  deleteCommentById,
  getAllComments,
  getAllRecipesAdmin,
  getDashboard,
} from "../controllers/adminController.js";
import auth from "../middleware/auth.js";

const adminRouter = express.Router();

userRouter.post("/register", adminRegister);
adminRouter.post("/login", adminLogin);
adminRouter.get("/comments", auth, getAllComments);
adminRouter.get("/recipes", getAllRecipesAdmin);
adminRouter.post("/delete-comment", auth, deleteCommentById);
adminRouter.post("/approve-comment", auth, approveCommentById);
adminRouter.get("/dashboard", auth, getDashboard);

export default adminRouter;
