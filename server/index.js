import express from "express";
import cors from "cors";
import dotenv from "dotenv";

import advisoryRoutes from "./routes/advisory.js";
import compareRoutes from "./routes/compare.js";
import errorHandler from "./middleware/error.js";

dotenv.config();

const app = express();

app.use(cors());
app.use(express.json());

app.use("/api/advisory", advisoryRoutes);
app.use("/api/compare", compareRoutes);

app.get("/api/health", (req, res) => {
  res.json({
    status: "ok"
  });
});

app.use(errorHandler);

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});