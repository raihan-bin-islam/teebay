import prisma from "../../lib/prisma-client";
import { Resolvers } from "../generated/graphql";

const rentalResolvers: Resolvers = {
  Mutation: {
    rentProduct: async (_, { data }, { req }) => {
      const renterId = req.userId;
      if (!renterId) throw new Error("Not authenticated");

      const { productId, startDate, endDate } = data;

      const product = await prisma.product.findUnique({ where: { id: productId } });
      if (!product) throw new Error("Product not found");
      if (product.status !== "AVAILABLE") throw new Error("Product is not available for rent");
      if (product.ownerId === renterId) throw new Error("You cannot rent your own product");
      if (!product.rentPrice || !product.rentPeriod) throw new Error("Product is not rentable");

      const existingRentals = await prisma.rental.findMany({
        where: {
          productId,
          OR: [
            {
              startDate: { lte: new Date(endDate) },
              endDate: { gte: new Date(startDate) },
            },
          ],
        },
      });

      if (existingRentals.length > 0) {
        throw new Error("Product is already rented for the selected dates");
      }

      const rental = await prisma.rental.create({
        data: {
          product: { connect: { id: productId } },
          renter: { connect: { id: renterId } },
          owner: { connect: { id: product.ownerId } },
          startDate: new Date(startDate),
          endDate: new Date(endDate),
        },
        include: { product: true, renter: true, owner: true },
      });

      await prisma.product.update({
        where: { id: productId },
        data: { status: "RENTED" },
      });

      return rental;
    },
  },
};
export default rentalResolvers;
