import { useEffect, useState } from "react";
import { FaRegComment } from "react-icons/fa";
import { MdOutlineDrafts } from "react-icons/md";
import { LuChefHat } from "react-icons/lu";
export const Dashboard = () => {
  const [dashboardData, setDashboardData] = useState({
    recipes: 0,
    comments: 0,
    drafts: 0,
    recentBlogs: [],
  });
  const dashboard_data = [
    {
      recipes: 10,
    },
  ];
  const fetchDashboard = async () => {
    setDashboardData(dashboard_data);
  };
  useEffect(() => {
    fetchDashboard();
  });
  return (
    <div className="flex-1 p-4 md:p-10 bg-blue-50/50">
      <div className="flex flex-wrap gap-4">
        <div
          className="flex items-center gap-4 bg-white p-4 min-w-58 rounded shadow cursor-pointer
        hover:scale-105 transition-all"
        >
          <LuChefHat className="text-primary"/>
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
          <FaRegComment className="text-primary"/>
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
          <MdOutlineDrafts className="text-primary"/>
          <div>
            <p className="text-xl font-semibold text-gray-600">
              {dashboardData.drafts}
            </p>
            <p className="text-gray-400 font-light">Drafts</p>
          </div>
        </div>
      </div>
    </div>
  );
};
