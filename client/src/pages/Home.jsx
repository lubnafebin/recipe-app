import { Header } from "../components/Header";
import { Navbar } from "../components/Navbar";
import { RecipeList } from "../components/RecipeList";

export const Home = () => {
  return (
    <>
      <Navbar />
      <Header />
      <RecipeList />
    </>
  );
};
