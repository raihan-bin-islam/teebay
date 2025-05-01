import type { CodegenConfig } from "@graphql-codegen/cli";

const config: CodegenConfig = {
  schema: "./src/graphql/schemas/**/*.graphql", // raw SDL files
  generates: {
    "./src/graphql/generated/graphql.ts": {
      plugins: ["typescript", "typescript-resolvers"],
      config: {
        useIndexSignature: true,
        mappers: {
          User: "@prisma/client#User",
          Product: "@prisma/client#Product",
          Category: "@prisma/client#Category",
          Rental: "@prisma/client#Rental",
          Transaction: "@prisma/client#Transaction",
          ProductStatus: "@prisma/client#ProductStatus",
        },
      },
    },
  },
};

export default config;
