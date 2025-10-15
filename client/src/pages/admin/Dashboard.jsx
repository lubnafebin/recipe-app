import { useEffect, useState } from "react";
import { FaRegComment } from "react-icons/fa";
import { MdOutlineDrafts } from "react-icons/md";
import { LuChefHat } from "react-icons/lu";
import { RiFileListLine } from "react-icons/ri";
import { RecipeTableItem } from "../../components/admin/RecipeTableItem";
export const Dashboard = () => {
  const [dashboardData, setDashboardData] = useState({
    recipes: 0,
    comments: 0,
    drafts: 0,
    recentBlogs: [],
  });
  const dashboard_data = {
    recipes: 10,
    comments: 5,
    drafts: 2,
    recentBlogs: [
      {
        _id: 0o1,
        title: "Masala Dosa",
        date: "2025-10-14",
        status: "published",
        actions: "",
        createdAt: "2025-04-30T09:30:06.918Z",
      },
      {
        _id: 0o2,
        title: "Avocado Smoothie",
        date: "2025-10-13",
        status: "published",
        actions: "",
        createdAt: "2025-04-30T09:30:06.918Z",
      },
    ],
  };
  const fetchDashboard = async () => {
    setDashboardData(dashboard_data);
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
              {dashboardData.recentBlogs.map((recipe, index) => {
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
