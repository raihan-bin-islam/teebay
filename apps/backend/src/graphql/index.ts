import path from "path";
import { loadFilesSync } from "@graphql-tools/load-files";
import { mergeTypeDefs, mergeResolvers } from "@graphql-tools/merge";

// 1) Loading all .graphql SDL files:
const typesArray = loadFilesSync(path.join(__dirname, "./schemas/**/*.graphql"), { recursive: true });

// 2) Loading all resolver modules (they should each `export default { … }` or named objects):
const resolversArray = loadFilesSync(path.join(__dirname, "./resolvers/**/*.{ts,js}"), { recursive: true });

// 3) Merge them into single objects:
export const typeDefs = mergeTypeDefs(typesArray);
export const resolvers = mergeResolvers(resolversArray);
