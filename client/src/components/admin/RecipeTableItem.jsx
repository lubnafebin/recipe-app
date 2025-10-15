import { TbXboxXFilled } from "react-icons/tb";

export const RecipeTableItem = ({ recipe, fetchRecipes, index }) => {
  const { title, createdAt } = recipe;
  const RecipeDate = new Date(createdAt);
  fetchRecipes
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
        <button className="border px-2 py-0.5 mt-1 rounded cursor-pointer">
          {recipe.isPublished ? "Unpublish" : "Publish"}
        </button>
        <TbXboxXFilled className="text-primary cursor-pointer w-8 hover:scale-110 transition-all mt-2" />
      </td>
    </tr>
  );
};
