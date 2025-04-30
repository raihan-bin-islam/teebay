// src/graphql/mutations/authMutations.ts
import gql from 'graphql-tag'

export const LOGIN_MUTATION = gql`
  mutation Login($email: String!, $password: String!) {
    login(email: $email, password: $password) {
      token
      user {
        id
        email
      }
    }
  }
`

export const REGISTER_MUTATION = gql`
  mutation Register(
    $firstName: String!
    $lastName: String!
    $address: String!
    $phone: String
    $email: String!
    $password: String!
  ) {
    register(
      firstName: $firstName
      lastName: $lastName
      address: $address
      phone: $phone
      email: $email
      password: $password
    ) {
      token
      user {
        id
        email
      }
    }
  }
`
