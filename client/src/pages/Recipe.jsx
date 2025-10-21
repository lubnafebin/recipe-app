import { useEffect, useState } from "react";
import { Navbar } from "../components/Navbar";
import { useParams } from "react-router-dom";
import {
  FaClock,
  FaFacebook,
  FaHeart,
  FaTwitter,
  FaUser,
} from "react-icons/fa";
import { IoLogoWhatsapp } from "react-icons/io";
import Moment from "moment";
import { Footer } from "../components/Footer";
import { Loader } from "../components/Loader";
import { useAppContext } from "../context/AppContext";
import toast from "react-hot-toast";
export const Recipe = () => {
  const { id } = useParams();
  const { axios } = useAppContext();
  const [data, setData] = useState(null);
  const [comments, setComments] = useState([]);
  const [name, setName] = useState("");
  const [content, setContent] = useState("");

  const fetchRecipeData = async () => {
    try {
      const { data } = await axios.get(`/api/recipe/${id}`);
      data.success ? setData(data.recipe) : toast.error(data.message);
    } catch (error) {
      toast.error(error.message);
    }
  };

  const fetchComments = async () => {
    try {
      const { data } = await axios.post("/api/recipe/comments", {
        recipeId: id,
      });
      if (data.success) {
        setComments(data.comments);
      } else {
        toast.error(data.message);
      }
    } catch (error) {
      toast.error(error.message);
    }
  };

  const addComment = async (e) => {
    e.preventDefault();
    try {
      const { data } = await axios.post("/api/recipe/add-comment", {
        recipe: id,
        name,
        content,
      });
      if (data.success) {
        toast.success(data.message);
        setName("");
        setContent("");
      } else {
        toast.error(data.message);
      }
    } catch (error) {
      toast.error(error.message);
    }
  };

  useEffect(() => {
    fetchRecipeData();
    fetchComments();
  }, []);
  return data ? (
    <div className="relative">
      <Navbar />
      <div className="max-w-4xl mx-auto mt-6 px-4">
        {/* Recipe Image */}
        <img
          src={data.image}
          alt="img"
          className="rounded-3xl mb-5 w-full h-80 object-cover shadow-md"
        />

        {/* Title */}
        <h1 className="text-2xl sm:text-5xl font-semibold text-gray-700">
          {data.title}
        </h1>

        {/* Description */}
        <p className="mt-4 text-gray-600">{data.description}</p>

        {/* Time & Likes Section */}
        <div className="flex items-center gap-6 mt-4 text-gray-500">
          <div className="flex items-center gap-2">
            <FaClock className="text-primary" />
            <span>{data.time}</span>
          </div>
          <div className="flex items-center gap-2">
            <FaHeart className="text-red-500" />
            <span>{data.likes}</span>
          </div>
        </div>

        {/* Horizontal Line */}
        <hr className="my-6 border-gray-300" />

        {/* Ingredients and Instructions */}
        <div className="grid md:grid-cols-2 gap-6 mt-6">
          {/* Ingredients Box */}
          {data.ingredients?.length > 0 && (
            <div className="p-5 bg-gray-50 border border-gray-200 rounded-xl shadow-sm">
              <h2 className="text-xl font-semibold text-gray-800 mb-3">
                Ingredients
              </h2>
              <ul className="list-disc list-inside text-gray-600 space-y-1">
                {data.ingredients.map((item, index) => (
                  <li key={index}>{item}</li>
                ))}
              </ul>
            </div>
          )}

          {/* Instructions Box */}
          {data.instructions?.length > 0 && (
            <div className="p-5 bg-gray-50 border border-gray-200 rounded-xl shadow-sm">
              <h2 className="text-xl font-semibold text-gray-800 mb-3">
                Instructions
              </h2>
              <ol className="list-decimal list-inside text-gray-600 space-y-2">
                {data.instructions.map((step, index) => (
                  <li key={index}>{step}</li>
                ))}
              </ol>
            </div>
          )}
        </div>

        {/* Comment Section */}
        <div className="mt-14 mb-10 max-w-3xl mx-auto">
          <p className="font-semibold mb-4">Comments ({comments.length})</p>
          <div className="flex flex-col gap-4">
            {comments.map((item, index) => (
              <div
                key={index}
                className="relative bg-primary/2 border border-primary/5 max-w-xl p-4 rounded text-gray-600"
              >
                <div className="flex items-center gap-2 mb-2">
                  <FaUser className="text-primary w-6" />
                  <p className="font-medium">{item.name}</p>
                </div>
                <p className="text-sm max-w-md ml-8">{item.content}</p>
                <div className="absolute right-4 bottom-3 flex items-center gap-2 text-xs">
                  {Moment(item.createdAt).fromNow()}
                </div>
              </div>
            ))}
          </div>

          {/* Add Comment Form */}
          <div className="max-w-3xl mx-auto mt-4">
            <p className="font-semibold mb-4">Add Your Comment</p>
            <form
              onSubmit={addComment}
              className="flex flex-col items-start gap-4 max-w-lg"
            >
              <input
                onChange={(e) => setName(e.target.value)}
                value={name}
                type="text"
                placeholder="Name"
                required
                className="w-full p-2 border border-gray-300 rounded outline-none"
              />
              <textarea
                onChange={(e) => setContent(e.target.value)}
                value={content}
                className="w-full p-2 border border-gray-300 rounded outline-none h-48"
                placeholder="Comment"
                required
              ></textarea>
              <button
                type="submit"
                className="bg-primary text-white rounded p-2 px-8 hover:scale-102 transition-all cursor-pointer"
              >
                Submit
              </button>
            </form>
          </div>

          {/* Share Section */}
          <div className="my-10 max-w-3xl mx-auto">
            <p className="font-semibold my-4">
              Share this Recipe on Social Media
            </p>
            <div className="flex gap-4 cursor-pointer">
              <FaFacebook className="text-primary" />
              <FaTwitter className="text-primary" />
              <IoLogoWhatsapp className="text-primary" />
            </div>
          </div>
        </div>
      </div>
      <Footer />
    </div>
  ) : (
    <Loader />
  );
};
