import { useEffect, useState } from "react";
import { FaRegComment } from "react-icons/fa";
import { MdOutlineDrafts } from "react-icons/md";
import { LuChefHat } from "react-icons/lu";
import { RiFileListLine } from "react-icons/ri";
import { RecipeTableItem } from "../../components/admin/RecipeTableItem";
import { useAppContext } from "../../context/AppContext";
import toast from "react-hot-toast";
export const Dashboard = () => {
  const { axios } = useAppContext();
  const [dashboardData, setDashboardData] = useState({
    recipes: 0,
    comments: 0,
    drafts: 0,
    recentBlogs: [],
  });

  const fetchDashboard = async () => {
    try {
      const { data } = await axios.get("/api/admin/dashboard");
      data.success
        ? setDashboardData(data.dashboardData)
        : toast.error(data.message);
    } catch (error) {
      toast.error(error.message);
    }
  };

  useEffect(() => {
    fetchDashboard();
  }, []);
  return (
    <div className="flex-1 p-4 md:p-10 bg-blue-50/50">
      <div className="flex flex-wrap gap-4">
        <div
          className="flex items-center gap-4 bg-white p-4 min-w-58 rounded shadow cursor-pointer
        hover:scale-105 transition-all"
        >
          <LuChefHat className="text-primary" />
          <div>
            <p className="text-xl font-semibold text-gray-600">
              {dashboardData.recipes}
            </p>
            <p className="text-gray-400 font-light">Recipes</p>
          </div>
        </div>

        <div
          className="flex items-center gap-4 bg-white p-4 min-w-58 rounded shadow cursor-pointer
        hover:scale-105 transition-all"
        >
          <FaRegComment className="text-primary" />
          <div>
            <p className="text-xl font-semibold text-gray-600">
              {dashboardData.comments}
            </p>
            <p className="text-gray-400 font-light">Comments</p>
          </div>
        </div>

        <div
          className="flex items-center gap-4 bg-white p-4 min-w-58 rounded shadow cursor-pointer
        hover:scale-105 transition-all"
        >
          <MdOutlineDrafts className="text-primary" />
          <div>
            <p className="text-xl font-semibold text-gray-600">
              {dashboardData.drafts}
            </p>
            <p className="text-gray-400 font-light">Drafts</p>
          </div>
        </div>
      </div>

      <div>
        <div className="flex items-center gap-3 m-4 mt-6 text-gray-600">
          <RiFileListLine className="text-primary" />
          <p>Latest Recipes</p>
        </div>
        <div className="relative max-w-4xl overflow-x-auto shadow rounded-lg scrollbar-hide bg-white">
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
              {dashboardData.recentRecipes?.map((recipe, index) => {
                return (
                  <RecipeTableItem
                    key={recipe._id}
                    recipe={recipe}
                    fetchRecipes={fetchDashboard}
                    index={index + 1}
                  />
                );
              })}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};
