import prisma from "../../lib/prisma-client";
import { Resolvers } from "../generated/graphql";

const categoryResolvers: Resolvers = {
  Query: {
    categories: async () => prisma.category.findMany(),
    category: async (_, { id }) =>
      prisma.category.findUnique({
        where: { id },
        include: { products: true },
      }),
  },
};
export default categoryResolvers;
