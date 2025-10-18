import { AppContext } from "../context/AppContext";
import axios from "axios";
import { useState } from "react";
import { useNavigate } from "react-router-dom";

axios.defaults.baseURL = import.meta.env.VITE_BASE_URL;

export const AppContextProvider = ({ children }) => {
  const navigate = useNavigate();
  const [token, setToken] = useState(null);
  const [recipes, setRecipes] = useState([]);
  const [input, setInput] = useState("");

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
