import { useState } from "react";

export const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
  };
  return (
    <div className="flex items-center justify-center h-screen">
      <div
        className="w-full max-w-sm p-6 max-md:m-6 border border-primary/30 
      shadow-xl shadow-primary/15 rounded-lg"
      >
        <div className="flex flex-col items-center justify-center">
          <div className="w-full py-6 text-center">
            <h1 className="text-3xl font-bold mb-2">
              <span className="text-primary">Admin</span> Login
            </h1>
            <p className="font-light text-gray-500 text-sm">
              Enter your credential to access the admin panel
            </p>
          </div>
          <form
            onSubmit={handleSubmit}
            className="mt-4 w-full sm:max-w-md text-gray-600"
          >
            <div className="flex flex-col">
              <label>Email</label>
              <input
                onChange={(e) => setEmail(e.target.value)}
                value={email}
                type="email"
                required
                placeholder="Your email"
                className="border-b-2 border-gray-300 p-2 outline-none mb-6 "
              />
            </div>
            <div className="flex flex-col">
              <label>Password</label>
              <input
                onChange={(e) => setPassword(e.target.value)}
                value={password}
                type="password"
                required
                placeholder="Your Password"
                className="border-b-2 border-gray-300 p-2 outline-none mb-6 "
              />
            </div>
            <button
              type="submit"
              className="w-full py-3 font-medium bg-primary text-white rounded 
              cursor-pointer hover:bg-primary/90 transition-all rounded-full"
            >
              Login
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};
