import prisma from "../../lib/prisma-client";
import { Resolvers } from "../generated/graphql";

const authResolvers: Resolvers = {
  Mutation: {
    register: async (_, { firstName, lastName, address, phone, email, password }) => {
      const user = await prisma.user.create({
        data: {
          firstName,
          lastName,
          address,
          phone,
          email,
          password,
        },
      });

      return {
        token: `token-${user.id}`,
        user,
      };
    },
    login: async (_, { email, password }) => {
      const user = await prisma.user.findUnique({ where: { email } });
      if (!user) throw new Error("User not found");
      if (user.password !== password) throw new Error("Invalid password");

      return {
        token: `token-${user.id}`,
        user,
      };
    },
  },
};

export default authResolvers;
