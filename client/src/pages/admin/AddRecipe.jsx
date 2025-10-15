import { useEffect, useRef, useState } from "react";
import Quill from "quill";

export const AddRecipe = () => {
  const editorRef = useRef(null);
  const quillRef = useRef(null);

  const [image, setImage] = useState(false);
  const [title, setTitle] = useState("");
  const [subTitle, setSubTitle] = useState("");
  const [category, setCategory] = useState("veg");
  const [isPublished, setIsPublished] = useState(false);

  const recipeCategories = [
    "healthy",
    "veg",
    "Non veg",
    "spicy",
    "sweet",
    "traditional",
  ];

  const generateContent = async () => {};

  const onSubmitHandler = async (e) => {
    e.preventDefault();
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
        <p>Upload thumbnail</p>
        <label htmlFor="">
          <img
            src={
              !image
                ? "https://imgs.search.brave.com/9BRtpaeHsuBf-5ajeO4NtWTJfenE--Iu2rJhztzDZv0/rs:fit:860:0:0:0/g:ce/aHR0cHM6Ly90NC5m/dGNkbi5uZXQvanBn/LzE1LzI4LzM2Lzc3/LzM2MF9GXzE1Mjgz/Njc3MzZfS2laNTk0/dUZ4QnlaVHZWQkw1/QjhhcHpCTE1mMGNm/RmQuanBn"
                : URL.createObjectURL(image)
            }
            alt="upload"
            className="mt-2 h-10 rounded cursor-pointer"
          />
          <input
            onChange={(e) => setImage(e.target.files[0])}
            type="file"
            id="image"
            hidden
            required
          />
        </label>
        <p className="mt-4">Recipe Title</p>
        <input
          type="text"
          name=""
          id=""
          placeholder="type here.."
          required
          className="w-full max-w-lg mt-2 p-1 border border-gray-300 outline-noe rounded"
          onChange={(e) => setTitle(e.target.value)}
          value={title}
        />
        <p className="mt-4">Sub Title</p>
        <input
          type="text"
          name=""
          id=""
          placeholder="type here.."
          required
          className="w-full max-w-lg mt-2 p-1 border border-gray-300 outline-noe rounded"
          onChange={(e) => setSubTitle(e.target.value)}
          value={subTitle}
        />
        <p className="mt-4">Recipe Description</p>
        <div className="max-w-lg h-74 pb-16 sm:pb-10 pt-2 relative">
          <div ref={editorRef}></div>
          <button
            type="button"
            onClick={generateContent}
            className="absolute bottom-1 right-2 ml-2 text-xs text-white bg-black/70 px-4 py-1.5 rounded hover:underline cursor-pointer"
          >
            Generate with AI
          </button>
        </div>

        <p className="mt-4">Category</p>
        <select
          onChange={(e) => setCategory(e.target.value)}
          value={category}
          name="category"
          className="mt-2 px-3 py-2 border text-gray-500 border-gray-300 outline-none rounded"
        >
          <option value="">Select Category</option>
          {recipeCategories.map((item, index) => {
            return (
              <option key={index} value={item}>
                {item}
              </option>
            );
          })}
        </select>

        <div className="flex gap-2 mt-4">
          <p>Publish Now</p>
          <input
            type="checkbox"
            checked={isPublished}
            className="scale-125 cursor-pointer"
            onChange={(e) => setIsPublished(e.target.checked)}
          />
        </div>

        <button
          type="submit"
          className="mt-8 w-40 h-10 bg-primary text-white rounded cursor-pointer text-sm"
        >
          Add Recipe
        </button>
      </div>
    </form>
  );
};
