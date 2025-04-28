import prisma from "@/lib/prisma-client";

export const userResolvers = {
  Query: {
    users: () => {
      return prisma.user.findMany();
    },
    user: (_, { id }) => {
      return prisma.user.findUnique({ where: { id } });
    },
  },
  Mutation: {
    register: async (_, { email, password }) => {
      const user = await prisma.user.create({
        data: { email, password },
      });
      return { token: `token-${user.id}`, user };
    },
    login: async (_, { email, password }) => {
      const user = await prisma.user.findUnique({ where: { email } });
      if (!user || user.password !== password) {
        throw new Error("Invalid credentials");
      }
      return { token: `token-${user.id}`, user };
    },
  },
};
