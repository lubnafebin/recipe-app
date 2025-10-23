import logo from "../assets/logo.png";
import { CiLogin } from "react-icons/ci";
import { useAppContext } from "../context/AppContext";
import { CiCirclePlus } from "react-icons/ci";
export const Navbar = () => {
  const { navigate, token } = useAppContext();
  return (
    <div className="flex justify-between items-center py-5 mx-4 sm:mx-16 xl:mx-28">
      <img
        onClick={() => navigate("/")}
        src={logo}
        alt=""
        className="w-24 sm:w-32 cursor-pointer"
      />
      <div className="flex items-center gap-4 sm:gap-10">
        <div className="flex items-center gap-1 text-primary text-sm sm:text-base">
          <CiCirclePlus />
          <span
            className="cursor-pointer"
            onClick={() => navigate("/generate")}
          >
            Generate
          </span>
        </div>
        <button
          onClick={() => navigate("/admin")}
          className="flex items-center gap-1 rounded-full text-xs sm:text-sm cursor-pointer bg-primary 
          text-white px-3 py-1.5 sm:px-6 sm:py-2"
        >
          <CiLogin />
          {token ? "Dashboard" : "Login"}
        </button>
      </div>
    </div>
  );
};
