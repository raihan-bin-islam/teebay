import express from "express";
import { ApolloServer } from "apollo-server-express";
import { PrismaClient } from "@prisma/client";
import dotenv from "dotenv";
import { typeDefs, resolvers } from "./graphql";
import { authMiddleware } from "./middlewares/auth.middleware";

dotenv.config();

const prisma = new PrismaClient();

async function startServer() {
  const app = express();

  // Apply middleware
  app.use(authMiddleware);

  const server = new ApolloServer({
    typeDefs,
    resolvers,
    context: ({ req }) => {
      return {
        prisma,
        req,
      };
    },
  });

  await server.start();
  server.applyMiddleware({ app });

  const PORT = process.env.PORT || 4000;
  app.listen(PORT, () => {
    console.log(`Server running at http://localhost:${PORT}${server.graphqlPath}`);
  });
}

startServer().catch((error) => {
  console.error("Error starting server:", error);
});
