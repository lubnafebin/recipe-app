import { FaComment, FaHome, FaList, FaPlus } from "react-icons/fa";
import { NavLink } from "react-router-dom";

export const Sidebar = () => {
  return (
    <div className="flex flex-col border-r border-gray-200 min-h-full pt-6">
      <NavLink
        end={true}
        to="/admin"
        className={({ isActive }) =>
          `flex items-center gap-3 py-3.5 px-3 md:px-9 md:min-w-64 cursor-pointer ${
            isActive && "bg-primary/10 border-r-4 border-primary"
          }`
        }
      >
        <FaHome className="min-w-4 w-5 text-primary/80" />
        <p className="hidden md:inline-block">Dashboard</p>
      </NavLink>
      <NavLink
        to="/admin/add-recipe"
        className={({ isActive }) =>
          `flex items-center gap-3 py-3.5 px-3 md:px-9 md:min-w-64 cursor-pointer ${
            isActive && "bg-primary/10 border-r-4 border-primary"
          }`
        }
      >
        <FaPlus className="min-w-4 w-5 text-primary/80" />
        <p className="hidden md:inline-block">Add Recipe</p>
      </NavLink>
      <NavLink
        to="/admin/list-recipe"
        className={({ isActive }) =>
          `flex items-center gap-3 py-3.5 px-3 md:px-9 md:min-w-64 cursor-pointer ${
            isActive && "bg-primary/10 border-r-4 border-primary"
          }`
        }
      >
        <FaList className="min-w-4 w-5 text-primary/80" />
        <p className="hidden md:inline-block">Recipe List</p>
      </NavLink>
      <NavLink
        to="/admin/comments"
        className={({ isActive }) =>
          `flex items-center gap-3 py-3.5 px-3 md:px-9 md:min-w-64 cursor-pointer ${
            isActive && "bg-primary/10 border-r-4 border-primary"
          }`
        }
      >
        <FaComment className="min-w-4 w-5 text-primary/80" />
        <p className="hidden md:inline-block">Comments</p>
      </NavLink>
    </div>
  );
};
