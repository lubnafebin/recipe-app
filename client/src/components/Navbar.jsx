import { useNavigate } from "react-router-dom";
import logo from "../assets/logo.png";
import { CiLogin } from "react-icons/ci";
export const Navbar = () => {
  const navigate = useNavigate();
  return (
    <div className="flex justify-between items-center py-5 mx-8 sm:mx-20 xl:mx-32">
      <img
        onClick={() => navigate("/")}
        src={logo}
        alt=""
        className="w-32 sm:44 cursor-pointer"
      />
      <button
        onClick={() => navigate("/admin")}
        className="flex items-center gap-2 rounded-full text-sm cursor-pointer bg-primary text-white px-6 py-2"
      >
        <CiLogin />
        Login
      </button>
    </div>
  );
};
