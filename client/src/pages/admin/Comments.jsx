import { useEffect, useState } from "react";
import { CommentTableItem } from "../../components/admin/CommentTableItem";

export const Comments = () => {
  const [comments, setComments] = useState([]);
  const [filter, setFilter] = useState("Not Approved");
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
      content: "This Recipe is Easy.made it for dinner today",
      isApproved: true,
      createdAt: "2025-04-30T09:30:06.918Z",
      updatedAt: "2025-04-30T09:30:06.918Z",
    },
    {
      _id: 2,
      recipe: recipeData[1],
      name: "michele",
      content: "Easy to follow and delicious result",
      isApproved: false,
      createdAt: "2025-04-30T09:30:06.918Z",
      updatedAt: "2025-04-30T09:30:06.918Z",
    },
  ];

  const fetchComments = async () => {
    setComments(commentsData);
  };
  useEffect(() => {
    fetchComments();
  }, []);
  return (
    <div className="flex-1 pt-5 px-5 sm:pl-16 sm:pt-12 bg-blue-50/50">
      <div className="flex justify-between items-center max-w-3xl">
        <h1>Comments</h1>
        <div className="flex gap-4">
          <button
            onClick={() => setFilter("Approved")}
            className={`shadow-custom-sm border rounded-full px-4 py-1 cursor-pointer text-xs ${
              filter === "Approved" ? "text-primary" : "text-gray-700"
            }`}
          >
            Approved
          </button>
          <button
            onClick={() => setFilter("Not Approved")}
            className={`shadow-custom-sm border rounded-full px-4 py-1 cursor-pointer text-xs ${
              filter === "Not Approved" ? "text-primary" : "text-gray-700"
            }`}
          >
            Not Approved
          </button>
        </div>
      </div>

      <div className="relative h-4/5 max-w-3xl overflow-x-auto mt-4 bg-white shadow rounded-lg  scrollbar-hide">
        <table className="w-full text-sm text-gray-500">
          <thead className="text-xs text-gray-700 text-left uppercase">
            <tr>
              <th scope="col" className="px-6 py-3">
                {" "}
                Recipe Title&Comments{" "}
              </th>
              <th scope="col" className="px-6 py-3 mx-sm:hidden">
                {" "}
                Date{" "}
              </th>
              <th scope="col" className="px-6 py-3">
                {" "}
                Action
              </th>
            </tr>
          </thead>
          <tbody>
            {comments
              .filter((comment) => {
                if (filter === "Approved") return comment.isApproved === true;
                return comment.isApproved === false;
              })
              .map((comment, index) => (
                <CommentTableItem
                  key={comment._id}
                  comment={comment}
                  index={index + 1}
                  fetchComments={fetchComments}
                />
              ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};
