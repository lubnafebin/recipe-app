import { useState, useRef, useEffect } from "react";
import { BsStars } from "react-icons/bs";
import axios from "axios";
import { FaArrowUp } from "react-icons/fa6";
import toast from "react-hot-toast";

export const AIGenerator = () => {
  const [prompt, setPrompt] = useState("");
  const [messages, setMessages] = useState([]); // { sender: "user" | "ai", text: string }
  const [loading, setLoading] = useState(false);
  const [chatStarted, setChatStarted] = useState(false);

  const messagesEndRef = useRef(null);

  // scroll to bottom
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  const handleGenerate = async () => {
    if (!prompt.trim()) return toast.error("Please describe your idea!");
    setChatStarted(true);

    // Add user message
    setMessages((prev) => [...prev, { sender: "user", text: prompt }]);
    setPrompt("");
    setLoading(true);

    try {
      const { data } = await axios.post("/api/recipe/generate", {
        prompt: `Generate a simple and beginner friendly recipe for: ${prompt}`,
      });

      if (data.success) {
        // Clean AI response
        const cleanText = data.content
          .replace(/\*\*(.*?)\*\*/g, "$1") // remove bold
          .replace(/\*(.*?)\*/g, "$1") // remove italics
          .replace(/^\s*[\d\-*]+\.\s*/gm, "") // remove numbered/bulleted lists
          .trim();

        setMessages((prev) => [...prev, { sender: "ai", text: cleanText }]);
      } else {
        toast.error(data.message);
      }
    } catch (error) {
      toast.error(error.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <section
      className="min-h-screen flex flex-col px-6 py-10 bg-gradient-to-b from-primary/10 
    via-primary/5 to-white"
    >
      {/* Hero Section */}
      {!chatStarted && (
        <div className="flex flex-col items-center text-center mb-10">
          <div
            className="inline-flex items-center justify-center gap-2 px-6 py-1.5 mb-4 border 
          border-primary/40 bg-primary/10 rounded-full text-sm text-primary"
          >
            <BsStars className="w-3 h-3 text-primary" />
            <p>AI Recipe Generator</p>
          </div>
          <h1 className="text-4xl sm:text-5xl font-semibold text-gray-800 mb-3">
            Create Your Perfect Recipe
          </h1>
          <p className="text-gray-500 max-w-2xl">
            Describe what you’re craving, and let AI craft a delicious recipe
            just for you — ingredients, steps, and all the flavor you imagine.
          </p>
        </div>
      )}

      {/* Chat Container */}
      <div className="flex-1 flex flex-col overflow-y-auto w-full max-w-3xl mx-auto">
        {messages.map((msg, index) => (
          <div
            key={index}
            className={`flex my-2 ${
              msg.sender === "user" ? "justify-end" : "justify-start"
            }`}
          >
            <div
              className={`max-w-[80%] p-3 rounded-xl ${
                msg.sender === "user"
                  ? "bg-primary text-white rounded-tr-none"
                  : "bg-white text-gray-800 rounded-tl-none"
              }`}
            >
              <pre className="whitespace-pre-wrap">{msg.text}</pre>
            </div>
          </div>
        ))}
        <div ref={messagesEndRef} />
      </div>

      {/* Input Box */}
      <div
        className="w-full max-w-3xl mt-4 flex items-center bg-white border border-gray-300 
      rounded-2xl shadow-sm p-2 focus-within:ring-2 focus-within:ring-primary transition-all mx-auto"
      >
        <textarea
          value={prompt}
          onChange={(e) => setPrompt(e.target.value)}
          rows={2}
          placeholder="Type your recipe idea..."
          className="flex-1 resize-none border-none outline-none px-4 py-2 text-gray-700 
          bg-transparent"
        />
        <button
          onClick={handleGenerate}
          disabled={loading}
          className={`bg-primary/20 text-white rounded-full p-2 transition-all ${
            loading ? "opacity-50 cursor-not-allowed" : "hover:scale-105"
          }`}
        >
          <FaArrowUp className="w-6 h-6 text-primary" />
        </button>
      </div>
    </section>
  );
};
