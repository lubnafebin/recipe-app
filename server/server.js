import express from "express";
import "dotenv/config";
import cors from "cors";
import connectDB from "./configs/connection.js";
import adminRouter from "./routes/adminRoutes.js";
import recipeRouter from "./routes/recipeRoutes.js";

const app = express();
await connectDB();

//middlewares
app.use(cors());
app.use(express.json());

//routes
app.get("/", (req, res) => {
  res.send("API is working");
});
app.use("/api/admin", adminRouter);
app.use("/api/recipe", recipeRouter);

const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
  console.log("server is running on port " + PORT);
});

export default app;
