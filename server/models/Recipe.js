import mongoose from "mongoose";

const RecipeSchema = new mongoose.Schema(
  {
    adminId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "user", 
      required: true,
    },
    title: {
      type: String,
      required: true,
      trim: true,
    },
    image: {
      type: String,
      required: true,
    },
    category: {
      type: String,
      required: true,
      enum: [
        "Quick & Easy",
        "Healthy Choices",
        "Traditional Flavors",
        "Sweet Treats",
      ],
    },
    description: {
      type: String,
      required: true,
    },
    ingredients: {
      type: [String],
      default: [],
    },
    instructions: {
      type: [String],
      default: [],
    },
    isPublished: { type: Boolean, required: true },
  },
  { timestamps: true }
);

const Recipe = mongoose.model("recipe", RecipeSchema);
export default Recipe;
