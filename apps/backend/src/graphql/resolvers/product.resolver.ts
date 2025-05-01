import prisma from "../../lib/prisma-client";
import { Resolvers } from "../generated/graphql";
const productResolvers: Resolvers = {
  Query: {
    products: async (_, __, { req }) => {
      const userId = req.userId;
      if (!userId) throw new Error("Not authenticated");
      return await prisma.product.findMany({
        where: {
          ownerId: { not: userId },
          transactions: { none: { buyerId: userId } },
          rentals: { none: { renterId: userId } },
        },
        include: { owner: true, categories: true },
      });
    },
    product: async (_, { id }, { req }) => {
      const userId = req.userId;
      if (!userId) throw new Error("Not authenticated");

      // Increment the view count
      await prisma.product.update({
        where: { id },
        data: {
          views: { increment: 1 },
        },
      });
      return await prisma.product.findUnique({
        where: { id, ownerId: { not: userId } },
        include: {
          owner: true,
          categories: true,
          transactions: true,
          rentals: true,
        },
      });
    },
  },
  Mutation: {
    createProduct: async (_, { data }, { req }) => {
      const userId = req.userId;
      if (!userId) throw new Error("Not authenticated");

      const { title, description, price, rentPrice, rentPeriod, categoryIds } = data;

      return prisma.product.create({
        data: {
          title,
          description,
          price,
          rentPrice,
          rentPeriod,
          owner: { connect: { id: userId } },
          categories: {
            connect: categoryIds.map((id) => ({ id })),
          },
        },
        // include: { owner: true, categories: true },
      });
    },
    updateProduct: async (_, { id, data }, { req }) => {
      const userId = req.userId;
      if (!userId) throw new Error("Not authenticated");

      const product = await prisma.product.findUnique({ where: { id } });
      if (!product) throw new Error("Product not found");
      if (product.ownerId !== userId) throw new Error("Not authorized");

      const { title, description, price, rentPrice, rentPeriod, categoryIds } = data;

      const updateData: any = {
        title,
        description,
        price,
        rentPrice,
        rentPeriod,
        categories: {
          set: categoryIds?.map((id) => ({ id })) ?? [], // always clear and set
        },
      };

      return await prisma.product.update({
        where: { id },
        data: updateData,
        include: { owner: true, categories: true },
      });
    },
    deleteProduct: async (_, { id }, { req }) => {
      const userId = req.userId;
      if (!userId) throw new Error("Not authenticated");

      const product = await prisma.product.findUnique({
        where: { id },
        include: { categories: true },
      });

      if (!product) throw new Error("Product not found");
      if (product.ownerId !== userId) throw new Error("Not authorized");

      await prisma.transaction.deleteMany({ where: { productId: id } });
      await prisma.rental.deleteMany({ where: { productId: id } });

      return prisma.product.delete({ where: { id } });
    },
  },
};

export default productResolvers;
