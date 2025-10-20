import { CiSearch } from "react-icons/ci";
import { FaStar } from "react-icons/fa";
import { useAppContext } from "../context/AppContext";
import { useRef } from "react";
export const Header = () => {
  const { setInput } = useAppContext();
  const inputRef = useRef();
  const onSubmitHandler = (e) => {
    e.preventDefault();
    setInput(inputRef.current.value);
  };
  return (
    <div className="mx-8 sm:mx-16 xl:mx-24 relative">
      <div className="text-center mt-8 mb-8">
        <div
          className="inline-flex items-center justify-center gap-4 px-6 py-1.5 
        mb-4 border border-primary/40 bg-primary/10 rounded-full text-sm"
        >
          <p>New: AI feature integrated</p>
          <FaStar className="w-2.5 text-primary" />
        </div>
        <h1
          className="text-3xl sm:text-6xl font-semibold sm:leading-16 
        text-gray-700"
        >
          Discover <span className="text-primary">Delicious</span> <br />
          Recipes
        </h1>
        <p className="my-6 sm:my-8 max-w-2xl m-auto max-sm:text-xs text-gray-500">
          Explore AI Powered recipes,share your favorites and join our culinary
          community
        </p>
        <form
          onSubmit={onSubmitHandler}
          className="flex justify-between max-w-lg max-sm:scale-75 mx-auto
        border border-gray-300 bg-white rounded overflow-hidden "
        >
          <input
            ref={inputRef}
            className="w-full pl-4 outline-none"
            type="text"
            placeholder="Search Recipes..."
            required
          />
          <button
            type="submit"
            className="bg-primary text-white px-8 py-2 m-1.5 
          rounded hover:scale-105 transition-all cursor-pointer"
          >
            <CiSearch />
          </button>
        </form>
      </div>
    </div>
  );
};
