import { TbXboxXFilled } from "react-icons/tb";
import { useAppContext } from "../../context/AppContext";
import toast from "react-hot-toast";

export const RecipeTableItem = ({ recipe, fetchRecipes, index }) => {
  const { title, createdAt } = recipe;
  const RecipeDate = new Date(createdAt);
  const { axios } = useAppContext();

  const deleteRecipe = async () => {
    const confirm = window.confirm("Are you sure you want to delete this?");
    if (!confirm) return;
    try {
      const { data } = await axios.post("/api/recipe/delete", {
        id: recipe._id,
      });
      if (data.success) {
        toast.success(data.message);
        await fetchRecipes();
      } else {
        toast.error(data.message);
      }
    } catch (error) {
      toast.error(error.message);
    }
  };

  const togglePublish = async () => {
    try {
      const { data } = await axios.post("/api/recipe/toggle-publish", {
        id: recipe._id,
      });
      if (data.success) {
        toast.success(data.message);
        await fetchRecipes();
      } else {
        toast.error(data.message);
      }
    } catch (error) {
      toast.error(error.message);
    }
  };
  return (
    <tr className="border-y border-gray-300">
      <th className="px-2 py-4">{index}</th>
      <td className="px-2 py-4">{title}</td>
      <td className="px-2 py-4 max-sm:hidden">{RecipeDate.toDateString()}</td>
      <td className="px-2 py-4 max-sm:hidden">
        <p
          className={`${
            recipe.isPublished ? "text-green-600" : "text-green-700"
          }`}
        >
          {recipe.isPublished ? "Published" : "Unpublished"}
        </p>
      </td>
      <td className="px-2 py-4 flex text-xs gap-3">
        <button
          onClick={togglePublish}
          className="border px-2 py-0.5 mt-1 rounded cursor-pointer"
        >
          {recipe.isPublished ? "Unpublish" : "Publish"}
        </button>
        <TbXboxXFilled
          onClick={deleteRecipe}
          className="text-primary cursor-pointer w-8 hover:scale-110 transition-all mt-2"
        />
      </td>
    </tr>
  );
};
