import { useEffect, useState } from "react";
import { RecipeTableItem } from "../../components/admin/RecipeTableItem";
import { useAppContext } from "../../context/AppContext";
import toast from "react-hot-toast";

export const ListRecipe = () => {
  const [recipe, setRecipe] = useState([]);
  const { axios } = useAppContext();

  const fetchRecipes = async () => {
    try {
      const { data } = await axios.get("/api/admin/recipes");
      if (data.success) {
        setRecipe(data.recipes);
      } else {
        toast.error(data.message);
      }
    } catch (error) {
      toast.error(error.message);
    }
  };

  useEffect(() => {
    fetchRecipes();
  }, []);

  return (
    <div className="flex-1 pt-5 px-5 sm:pt-12 sm:pl-16 bg-blue-50/50">
      <h1>All Recipes</h1>
      <div className="relative h-4/5 mt-4 max-w-4xl overflow-x-auto shadow rounded-lg scrollbar-hide bg-white">
        <table className="w-full text-sm text-gray-500">
          <thead className="text-xs text-gray-600 text-left uppercase">
            <tr>
              <th scope="col" className="px-2 py-4 xl:px-6">
                #
              </th>
              <th scope="col" className="px-2 py-4">
                Recipe Title
              </th>
              <th scope="col" className="px-2 py-4">
                Date
              </th>
              <th scope="col" className="px-2 py-4 max-sm:hidden">
                Status
              </th>
              <th scope="col" className="px-2 py-4">
                Actions
              </th>
            </tr>
          </thead>
          <tbody>
            {recipe.map((recipe, index) => {
              return (
                <RecipeTableItem
                  key={recipe._id}
                  recipe={recipe}
                  fetchRecipes={fetchRecipes}
                  index={index + 1}
                />
              );
            })}
          </tbody>
        </table>
      </div>
    </div>
  );
};
