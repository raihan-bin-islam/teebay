import prisma from "../../lib/prisma-client";
import { Resolvers } from "../generated/graphql";

const userResolvers: Resolvers = {
  Query: {
    users: async () => prisma.user.findMany(),
    user: async (_, { id }) =>
      prisma.user.findUnique({
        where: { id },
        include: {
          products: true,
          boughtProducts: true,
          soldProducts: true,
          rentedProducts: true,
          lentProducts: true,
        },
      }),
    myProducts: async (_, __, { req }) => {
      const userId = req.userId;
      if (!userId) throw new Error("Not authenticated");
      return prisma.product.findMany({
        where: { ownerId: userId },
        include: { categories: true },
      });
    },
    myProduct: async (_, { id }, { req }) => {
      const userId = req.userId;
      if (!userId) throw new Error("Not authenticated");
      return prisma.product.findUnique({
        where: { ownerId: userId, id },
        include: { categories: true },
      });
    },
    myBoughtProducts: async (_, __, { req }) => {
      const userId = req.userId;
      if (!userId) throw new Error("Not authenticated");
      return prisma.transaction.findMany({
        where: {
          buyerId: userId,
        },
        include: {
          product: { include: { categories: true } },
          buyer: true,
          seller: true,
        },
      });
    },
    mySoldProducts: async (_, __, { req }) => {
      const userId = req.userId;
      if (!userId) throw new Error("Not authenticated");
      return prisma.transaction.findMany({
        where: {
          sellerId: userId,
        },
        include: {
          product: { include: { categories: true } },
          buyer: true,
          seller: true,
        },
      });
    },
    myBorrowedProducts: async (_, __, { req }) => {
      const userId = req.userId;
      if (!userId) throw new Error("Not authenticated");
      return prisma.rental.findMany({
        where: {
          renterId: userId,
        },
        include: {
          product: { include: { categories: true } },
          renter: true,
          owner: true,
        },
      });
    },
    myLentProducts: async (_, __, { req }) => {
      const userId = req.userId;
      if (!userId) throw new Error("Not authenticated");
      return prisma.rental.findMany({
        where: {
          ownerId: userId,
        },
        include: {
          product: { include: { categories: true } },
          renter: true,
          owner: true,
        },
      });
    },
    // myTransactions: async (_, __, { req }) => {
    //   const userId = req.userId;
    //   if (!userId) throw new Error("Not authenticated");
    //   return prisma.transaction.findMany({
    //     where: {
    //       OR: [{ buyerId: userId }, { sellerId: userId }],
    //     },
    //     include: {
    //       product: true,
    //       buyer: true,
    //       seller: true,
    //     },
    //   });
    // },
    // myRentals: async (_, __, { req }) => {
    //   const userId = req.userId;
    //   if (!userId) throw new Error("Not authenticated");
    //   return prisma.rental.findMany({
    //     where: {
    //       OR: [{ renterId: userId }, { ownerId: userId }],
    //     },
    //     include: {
    //       product: true,
    //       renter: true,
    //       owner: true,
    //     },
    //   });
    // },
  },
  User: {
    transactions: async (parent) =>
      prisma.transaction.findMany({
        where: {
          OR: [{ buyerId: parent.id }, { sellerId: parent.id }],
        },
      }),
    rentals: async (parent) =>
      prisma.rental.findMany({
        where: {
          OR: [{ renterId: parent.id }, { ownerId: parent.id }],
        },
      }),
  },
};
export default userResolvers;
