import { useState } from "react";
// eslint-disable-next-line no-unused-vars
import { motion } from "motion/react";
import { RecipeCard } from "./RecipeCard";
import { useAppContext } from "../context/AppContext";
export const RecipeList = () => {
  const { recipes, input } = useAppContext();

  const filteredRecipes = () => {
    if (input === "") {
      return recipes;
    } else {
      return recipes.filter(
        (recipe) =>
          recipe.title.toLowerCase().includes(input.toLowerCase()) ||
          recipe.category.toLowerCase().includes(input.toLowerCase())
      );
    }
  };

  const recipeCategory = [
    "All",
    "Quick & Easy",
    "Healthy Choices",
    "Sweet Treats",
  ];

  const [menu, setMenu] = useState("All");
  return (
    <div>
      <div
        className="hidden sm:flex justify-center gap-4 sm:gap-8 my-10
      relative"
      >
        {recipeCategory.map((item) => (
          <div key={item} className="relative">
            <button
              onClick={() => setMenu(item)}
              className={`text-gray-500 cursor-pointer ${
                menu === item && "text-white px-4 pt-0.5"
              }`}
            >
              {item}
              {menu === item && (
                <motion.div
                  layoutId="underline"
                  transition={{ type: "spring", stiffness: 500, damping: 30 }}
                  className="absolute left-0 right-0 top-0 h-7 -z-1 
              bg-primary rounded-full"
                ></motion.div>
              )}
            </button>
          </div>
        ))}
      </div>
      <div
        className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 xl:grid-cols-4 gap-8 
      mb-24 mx-8 sm:mx-16 xl:mx-40"
      >
        {filteredRecipes()
          .filter((recipe) =>
            menu === "All" ? true : recipe.category === menu
          )
          .map((recipe) => (
            <RecipeCard key={recipe._id} recipe={recipe} />
          ))}
      </div>
    </div>
  );
};
