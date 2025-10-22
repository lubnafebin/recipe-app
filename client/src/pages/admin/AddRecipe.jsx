import { useEffect, useRef, useState } from "react";
import Quill from "quill";
import { useAppContext } from "../../context/AppContext";
import toast from "react-hot-toast";
import { data } from "react-router-dom";

export const AddRecipe = () => {
  const editorRef = useRef(null);
  const quillRef = useRef(null);

  const { axios } = useAppContext();
  const [isAdding, setIsAdding] = useState(false);
  const [loading, setLoading] = useState(false);

  const [image, setImage] = useState(false);
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [ingredients, setIngredients] = useState([]);
  const [newIngredient, setNewIngredient] = useState("");
  const [instructions, setInstructions] = useState([]);
  const [category, setCategory] = useState("veg");
  const [isPublished, setIsPublished] = useState(false);

  const recipeCategories = [
    "Quick & Easy",
    "Healthy Choices",
    "Traditional Flavors",
    "Sweet Treats",
  ];

  const generateContent = async () => {
    if (!title.trim()) return toast.error("Enter recipe title first!");
    if (ingredients.length === 0) return toast.error("Add ingredients first!");

    try {
      setLoading(true);
      const { data } = await axios.post("/api/recipe/generate", {
        title,
        ingredients,
      });
      let cleanText = data.content
        .replace(/\*\*/g, "")
        .replace(/^\d+\.\s*/gm, "")
        .replace(/[-*]\s*/g, "");
      if (data.success) {
        setInstructions(
          cleanText.split("\n").filter((line) => line.trim() !== "")
        );
      } else {
        toast.error(data.message);
      }
    } catch (error) {
      toast.error(error.message);
    } finally {
      setLoading(false);
    }
  };

  const removeIngredient = (index) => {
    setIngredients(ingredients.filter((_, i) => i !== index));
  };

  const addIngredient = () => {
    if (newIngredient.trim() !== "") {
      setIngredients([...ingredients, newIngredient.trim()]);
      setNewIngredient("");
    }
  };

  const onSubmitHandler = async (e) => {
    e.preventDefault();
    setIsAdding(true);
    if (!image || !title || !description || !category) {
      return alert("Please fill all required fields");
    }

    const formData = new FormData();
    formData.append(
      "recipe",
      JSON.stringify({
        title,
        description,
        category,
        ingredients,
        instructions,
        isPublished,
      })
    );
    formData.append("image", image);

    try {
      const res = await axios.post("/api/recipe/add", formData, {
        headers: { "Content-Type": "multipart/form-data" },
      });

      if (res.data.success) {
        toast.success(res.data.message);
        // Reset form
        setTitle("");
        setDescription("");
        setCategory("");
        setIngredients([]);
        setInstructions([]);
        setImage(null);
        setIsPublished(false);
      } else {
        toast.error(data.message);
      }
    } catch (error) {
      toast.error(error.message);
    } finally {
      setIsAdding(false);
    }
  };

  useEffect(() => {
    if (!quillRef.current && editorRef.current) {
      quillRef.current = new Quill(editorRef.current, { theme: "snow" });
    }
  }, []);

  return (
    <form
      onSubmit={onSubmitHandler}
      className="flex-1 bg-blue-50/50 text-gray-600 h-full overflow-scroll"
    >
      <div className="bg-white w-full max-w-3xl p-4 md:p-10 sm:m-10 shadow rounded">
        {/* Image Upload */}
        <p>Upload Thumbnail</p>
        <label>
          <img
            src={
              !image
                ? "https://imgs.search.brave.com/9BRtpaeHsuBf-5ajeO4NtWTJfenE--Iu2rJhztzDZv0/rs:fit:860:0:0:0/g:ce/aHR0cHM6Ly90NC5m/dGNkbi5uZXQvanBn/LzE1LzI4LzM2Lzc3/LzM2MF9GXzE1Mjgz/Njc3MzZfS2laNTk0/dUZ4QnlaVHZWQkw1/QjhhcHpCTE1mMGNm/RmQuanBn"
                : URL.createObjectURL(image)
            }
            alt="upload"
            className="mt-2 h-20 rounded cursor-pointer object-cover"
          />
          <input
            onChange={(e) => setImage(e.target.files[0])}
            type="file"
            id="image"
            hidden
            required
          />
        </label>

        {/* Title */}
        <p className="mt-4">Recipe Title</p>
        <input
          type="text"
          placeholder="Type here..."
          required
          className="w-full max-w-lg mt-2 p-2 border border-gray-300 outline-none rounded"
          onChange={(e) => setTitle(e.target.value)}
          value={title}
        />

        {/* Description */}
        <p className="mt-4">Recipe Description</p>
        <textarea
          placeholder="Write your recipe description..."
          required
          className="w-full max-w-lg mt-2 p-2 border border-gray-300 outline-none rounded h-24"
          onChange={(e) => setDescription(e.target.value)}
          value={description}
        ></textarea>

        {/* Category */}
        <p className="mt-4">Category</p>
        <select
          onChange={(e) => setCategory(e.target.value)}
          value={category}
          name="category"
          className="mt-2 px-3 py-2 border text-gray-500 border-gray-300 outline-none rounded"
        >
          <option value="">Select Category</option>
          {recipeCategories.map((item, index) => (
            <option key={index} value={item}>
              {item}
            </option>
          ))}
        </select>

        {/* Ingredients */}
        <p className="mt-4">Ingredients</p>
        <div className="flex gap-2 mt-2">
          <input
            type="text"
            value={newIngredient}
            onChange={(e) => setNewIngredient(e.target.value)}
            placeholder="e.g. 2 cups rice"
            className="border p-2 rounded w-full"
          />
          <button
            type="button"
            onClick={addIngredient}
            className="bg-primary text-white px-3 rounded cursor-pointer"
          >
            Add
          </button>
        </div>
        <div className="mt-2 flex flex-wrap gap-2">
          {ingredients.map((item, index) => (
            <span
              key={index}
              className="bg-gray-200 text-sm px-2 py-1 rounded-full flex items-center gap-1"
            >
              {item}
              <button
                type="button"
                onClick={() => removeIngredient(index)}
                className="text-red-500"
              >
                ×
              </button>
            </span>
          ))}
        </div>

        {/* Instructions */}
        <p className="mt-4">Instructions</p>
        <div className="relative">
          <textarea
            value={instructions.join("\n")}
            onChange={(e) => setInstructions(e.target.value.split("\n"))}
            placeholder="Write or generate instructions..."
            className="w-full border rounded p-2 h-40"
          ></textarea>
          {loading && (
            <div
              className="absolute right-0 top-0 bottom-0 left-0 flex items-center 
            justify-center bg-black/10"
            >
              <div className="w-8 h-8 rounded-full border-2 border-t-white animate-spin"></div>
            </div>
          )}
          <button
            disabled={loading}
            type="button"
            onClick={generateContent}
            className="absolute bottom-2 right-2 text-xs text-white bg-black/70 px-3 py-1.5 rounded cursor-pointer"
          >
            Generate with AI
          </button>
        </div>

        {/* Publish Toggle */}
        <div className="flex gap-2 mt-4">
          <p>Publish Now</p>
          <input
            type="checkbox"
            checked={isPublished}
            className="scale-125 cursor-pointer"
            onChange={(e) => setIsPublished(e.target.checked)}
          />
        </div>

        {/* Submit */}
        <button
          disabled={isAdding}
          type="submit"
          className="mt-8 w-40 h-10 bg-primary hover:bg-primary/80 text-white rounded cursor-pointer text-sm"
        >
          {isAdding ? "Adding..." : "Add Recipe"}
        </button>
      </div>
    </form>
  );
};
