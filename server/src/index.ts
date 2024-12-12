import exress from "express";
import dotenv from "dotenv";
import { moviesRouter } from "./routes";
import { connectToDatabase } from "./db";

dotenv.config();

const app = exress();
const PORT = process.env.SERVER_PORT || 5000;

app.use(moviesRouter);

app.use("*", (_req, res) => {
  res.status(404).json({ message: "Route not found" });
});

const startServer = async () => {
  await connectToDatabase();
  app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
  });
};

startServer();
