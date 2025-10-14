import { useEffect, useState } from "react";
import { Navbar } from "../components/Navbar";
import { useParams } from "react-router-dom";
import { FaFacebook, FaTwitter, FaUser } from "react-icons/fa";
import { IoLogoWhatsapp } from "react-icons/io";
import Moment from "moment";
import { Footer } from "../components/Footer";
import { Loader } from "../components/Loader";
export const Recipe = () => {
  const { id } = useParams();
  const [data, setData] = useState(null);
  const [comments, setComments] = useState([]);
  const [name, setName] = useState("");
  const [content, setContent] = useState("");

  const recipeData = [
    {
      _id: "1",
      title: "Masala Dosa",
      image:
        "https://images.unsplash.com/photo-1668236543090-82eba5ee5976?ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&q=80&w=1170",
      category: "Traditional Flavors",
      description:
        "A crispy South Indian crepe made from rice and lentil batter, filled with a spiced potato masala. Served hot with coconut chutney and sambar.",
    },
    {
      _id: "2",
      title: "Avocado Smoothie",
      image:
        "https://media.istockphoto.com/id/1283542497/photo/creamy-smoothie-from-avocado-and-banana-in-glass-cups-with-paper-tubes-on-a-light-background.webp?a=1&b=1&s=612x612&w=0&k=20&c=kPiVzmeD3seVa7YbC0zCpEuiHDo-lW6JtJtEBH39Z4Q=",
      category: "Healthy Choices",
      description:
        "A creamy blend of ripe avocado, honey, and milk for a quick and nutritious breakfast or post-workout drink.",
    },
    {
      _id: "3",
      title: "Paneer Wrap",
      image:
        "https://media.istockphoto.com/id/1352474720/photo/fresh-paneer-roll-with-fresh-tomatos-salad-cheese-and-onions-isolated-on-bright-blue.webp?a=1&b=1&s=612x612&w=0&k=20&c=HHeBNencFEcT2ZplHH2SJ-5us8L-m8GYHmfMhoMuzaw=",
      category: "Quick & Easy",
      description:
        "Soft paneer cubes cooked in spicy sauce and wrapped in warm roti with fresh veggies — a perfect on-the-go meal.",
    },
    {
      _id: "4",
      title: "Chocolate Lava Cake",
      image:
        "https://media.istockphoto.com/id/544716244/photo/warm-chocolate-lava-cake-with-molten-center-and-red-currants.webp?a=1&b=1&s=612x612&w=0&k=20&c=LJLYYuVRRWLW2ODCdrF_Fcxrg-DVijWHnfzwtyehqCM=",
      category: "Sweet Treats",
      description:
        "A rich and gooey chocolate dessert with a molten center, best enjoyed warm with vanilla ice cream.",
    },
    {
      _id: "5",
      title: "Lemon Rice",
      image:
        "https://media.istockphoto.com/id/670526200/photo/poha-indian-snacks.webp?a=1&b=1&s=612x612&w=0&k=20&c=Hk3V0HSj6TqX6ptLTMMlEgaAs7U0AbkjfnJ0cY1fqWY=",
      category: "Traditional Flavors",
      description:
        "Tangy and aromatic rice flavored with lemon juice, curry leaves, and mustard seeds — a South Indian comfort food favorite.",
    },
    {
      _id: "6",
      title: "Oats Pancake",
      image:
        "https://media.istockphoto.com/id/1742038467/photo/super-healthy-food-oatmeal-pancakes-with-honey-and-chia-seeds.webp?a=1&b=1&s=612x612&w=0&k=20&c=yNlwqUCMJmf3YmWqoi4mJFarAgp4qcLrnODV7sU6__k=",
      category: "Healthy Choices",
      description:
        "Wholesome pancakes made from oats, banana, and milk — a guilt-free and filling breakfast option.",
    },
    {
      _id: "7",
      title: "Veg Noodles",
      image:
        "https://media.istockphoto.com/id/1497708305/photo/noodles-and-veg-manchurian-in-a-bowl-food-stock-photo.webp?a=1&b=1&s=612x612&w=0&k=20&c=4mSkeLj8Y2gIlupTKG-Nenq_DiuMcqJUCA1mw-m0aYE=",
      category: "Quick & Easy",
      description:
        "Stir-fried noodles tossed with colorful vegetables and soy sauce — quick to make and full of flavor.",
    },
    {
      _id: "8",
      title: "Mango Pudding",
      image:
        "https://media.istockphoto.com/id/471258447/photo/mango-pudding-and-coffee-jelly.webp?a=1&b=1&s=612x612&w=0&k=20&c=hsEM7Gc3KfVrLxRD7qjCvlTV8XO78hCdTUwKL7ByqMw=",
      category: "Sweet Treats",
      description:
        "A smooth and refreshing dessert made with ripe mango pulp and creamy milk — perfect for summer.",
    },
  ];
  const commentsData = [
    {
      _id: 1,
      recipe: recipeData[0],
      name: "michel",
      content: "comment",
      isApproved: false,
      createdAt: "2025-04-30T09:30:06.918Z",
      updatedAt: "2025-04-30T09:30:06.918Z",
    },
    {
      _id: 2,
      recipe: recipeData[1],
      name: "michele",
      content: "comment",
      isApproved: false,
      createdAt: "2025-04-30T09:30:06.918Z",
      updatedAt: "2025-04-30T09:30:06.918Z",
    },
  ];

  const fetchRecipeData = async () => {
    const data = recipeData.find((item) => item._id === id);
    setData(data);
  };

  const fetchComments = async () => {
    setComments(commentsData);
  };

  const addComment = async (e) => {
    e.preventDefault();
  };

  useEffect(() => {
    fetchRecipeData();
    fetchComments();
  }, []);
  return data ? (
    <div className="relative">
      <Navbar />
      <div className="max-w-xl md:mx-auto mt-3">
        <img src={data.image} alt="img" className="rounded-3xl mb-5" />
        <h1 className="text-3xl sm:text-5xl font-semibold max-w-2xl text-gray-800">
          {data.title}
        </h1>
        <p className="mt-4">{data.description}</p>
        <div className="mt-14 mb-10 max-w-3xl mx-auto">
          <p className="font-semibold mb-4">Comments ({comments.length})</p>
          <div className="flex flex-col gap-4">
            {comments.map((item, index) => (
              <div
                key={index}
                className="relative bg-primary/2 border border-primary/5 max-w-xl p-4
              rounded text-gray-600"
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
                className="w-full p-2 border border-gray-300 rounded outline-null"
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

          <div className="my-24 max-w-3xl mx-auto">
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
