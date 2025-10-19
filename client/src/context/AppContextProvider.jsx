import { AppContext } from "../context/AppContext";
import axios from "axios";
import { useEffect, useState } from "react";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";

axios.defaults.baseURL = import.meta.env.VITE_BASE_URL;

export const AppContextProvider = ({ children }) => {
  const navigate = useNavigate();
  const [token, setToken] = useState(null);
  const [recipes, setRecipes] = useState([]);
  const [input, setInput] = useState("");

  const fetchRecipes = async () => {
    try {
      const { data } = await axios.get("/api/recipe/all");
      data.success ? setRecipes(data.recipes) : toast.error(data.message);
    } catch (error) {
      toast.error(error.message);
    }
  };

  useEffect(() => {
    fetchRecipes();
    const token = localStorage.getItem("token");
    if (token) {
      setToken(token);
      axios.defaults.headers.common["Authorization"] = `${token}`;
    }
  }, []);

  const value = {
    token,
    navigate,
    axios,
    setToken,
    recipes,
    setRecipes,
    input,
    setInput,
  };
  return <AppContext.Provider value={value}>{children}</AppContext.Provider>;
};
