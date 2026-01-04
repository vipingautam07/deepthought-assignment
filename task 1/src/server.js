import dotenv from "dotenv";
dotenv.config();

import express from "express";
import { connectDB } from "./db.js";
import eventRoutes from "./Routes/events.js";

// console.log("DEBUG MONGO_URI:", process.env.MONGO_URI);

const app = express();
app.use(express.json());
app.use("/uploads", express.static("uploads"));

app.use("/api/v3/app", eventRoutes);

const PORT = process.env.PORT || 5000;

connectDB().then(() => {
  app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
  });
});

