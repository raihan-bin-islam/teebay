import prisma from "../../lib/prisma-client";
import { Resolvers } from "../generated/graphql";
const transactionResolvers: Resolvers = {
  Mutation: {
    buyProduct: async (_, { productId }, { req }) => {
      const buyerId = req.userId;
      if (!buyerId) throw new Error("Not authenticated");

      const product = await prisma.product.findUnique({ where: { id: productId } });
      if (!product) throw new Error("Product not found");
      if (product.status !== "AVAILABLE") throw new Error("Product is not available for purchase");
      if (product.ownerId === buyerId) throw new Error("You cannot buy your own product");

      const transaction = await prisma.transaction.create({
        data: {
          product: { connect: { id: productId } },
          buyer: { connect: { id: buyerId } },
          seller: { connect: { id: product.ownerId } },
        },
        include: { product: true, buyer: true, seller: true },
      });

      await prisma.product.update({
        where: { id: productId },
        data: { status: "SOLD" },
      });

      return transaction;
    },
  },
};
export default transactionResolvers;
