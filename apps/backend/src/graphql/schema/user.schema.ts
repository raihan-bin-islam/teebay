import { gql } from "apollo-server-express";

export const userSchema = gql`
  type User {
    id: Int!
    email: String!
    password: String!
    products: [Product!]!
    transactions: [Transaction!]!
    rentals: [Rental!]!
  }

  extend type Query {
    users: [User!]!
    user(id: Int!): User
  }

  extend type Mutation {
    register(email: String!, password: String!): AuthPayload!
    login(email: String!, password: String!): AuthPayload!
  }
`;
