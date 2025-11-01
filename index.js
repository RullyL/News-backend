import express from "express";
import cors from "cors";
import db from "./config/database.js";
import articleRoute from "./routes/articleRoute.js";

const app = express();
app.use(cors());
app.use(express.json());

// Test DB connection
(async () => {
  try {
    await db.authenticate();
    console.log("✅ Database connected!");
  } catch (error) {
    console.error("❌ Unable to connect to DB:", error);
  }
})();

// Routes
app.use("/api", articleRoute);

// Default route
app.get("/", (req, res) => res.send("Server is running"));

// Start server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
