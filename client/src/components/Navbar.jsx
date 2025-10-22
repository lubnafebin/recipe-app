import logo from "../assets/logo.png";
import { CiLogin } from "react-icons/ci";
import { useAppContext } from "../context/AppContext";
import { CiCirclePlus } from "react-icons/ci";
export const Navbar = () => {
  const { navigate, token } = useAppContext();
  return (
    <div className="flex justify-between items-center py-5 mx-8 sm:mx-20 xl:mx-32">
      <img
        onClick={() => navigate("/")}
        src={logo}
        alt=""
        className="w-32 sm:44 cursor-pointer"
      />
      <div className="flex items-center gap-10">
        <div className="flex items-center gap-1 text-primary">
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
          className="flex items-center gap-2 rounded-full text-sm cursor-pointer bg-primary text-white px-6 py-2"
        >
          <CiLogin />
          {token ? "Dashboard" : "Login"}
        </button>
      </div>
    </div>
  );
};
