import { FaStar } from "react-icons/fa";
import { useAppContext } from "../context/AppContext";
import { useRef } from "react";
export const Header = () => {
  const { setInput, input } = useAppContext();
  const inputRef = useRef();
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
        <form className="flex justify-between max-w-lg mx-auto">
          <input
            ref={inputRef}
            type="text"
            value={input}
            placeholder="Search Recipes..."
            onChange={(e) => setInput(e.target.value)}
            className="w-full border border-gray-300 rounded-lg px-4 py-2 outline-none focus:ring-1 focus:ring-primary/40"
          />
        </form>
      </div>
    </div>
  );
};
