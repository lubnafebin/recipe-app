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

    if (!title || !category || !description || ingredients || instructions) {
      return res.json({ success: false, message: "Missing required fields" });
    }
  } catch (error) {}
};
