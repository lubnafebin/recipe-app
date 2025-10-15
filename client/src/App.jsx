import { Route, Routes } from "react-router-dom";
import { Home } from "./pages/Home";
import { Recipe } from "./pages/Recipe";
import { Layout } from "./pages/admin/Layout";
import { Dashboard } from "./pages/admin/Dashboard";
import { ListRecipe } from "./pages/admin/ListRecipe";
import { AddRecipe } from "./pages/admin/AddRecipe";
import { Comments } from "./pages/admin/Comments";
import { Login } from "./components/admin/Login";
import "quill/dist/quill.snow.css";
export const App = () => {
  return (
    <div>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/recipe/:id" element={<Recipe />} />
        <Route path="/admin" element={<Layout />}>
          {/* <Login /> */}
          <Route index element={<Dashboard />} />
          <Route path="add-recipe" element={<AddRecipe />} />
          <Route path="list-recipe" element={<ListRecipe />} />
          <Route path="comments" element={<Comments />} />
        </Route>
      </Routes>
    </div>
  );
};
