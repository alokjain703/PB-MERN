import express from "express";
import mongoose from "mongoose";
import bodyParser from "body-parser";
import cors from "cors";
import dotenv from "dotenv";
import userRoutes from "./routes/userRoutes.js";
import authRoutes from "./routes/authRoutes.js";
import blogRoutes from "./routes/blogRoutes.js";

// Imports for GraphQL
import { ApolloServer } from "@apollo/server";
// import { expressMiddleware } from "@apollo/server/express5";
import { expressMiddleware } from '@as-integrations/express5';
import { typeDefs, resolvers } from "./graphql/index.js";

dotenv.config();

const app = express();
const PORT = process.env.PORT || 5002;

// Middleware (must be before Apollo Server)
app.use(bodyParser.json());
app.use(cors());

// MongoDB connection
const mongoURI = process.env.MONGO_DB_URI;

// Connect to MongoDB
mongoose
  .connect(mongoURI)
  .then(() => console.log("MongoDB connected"))
  .catch((err) => console.log(err));

// Apollo Server setup
const apolloServer = new ApolloServer({
  typeDefs,
  resolvers,
});

apolloServer
  .start()
  .then(() => app.use('/graphql', express.json(), expressMiddleware(apolloServer)));

// Routes
app.use("/api/auth", authRoutes);
app.use("/api/users", userRoutes);
app.use("/api/blogs", blogRoutes);

// test api health check
app.get("/api/health", (req, res) => {
  res.send("API is running...");
});

// Start the server
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});

export { app };