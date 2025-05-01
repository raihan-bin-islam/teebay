import gql from 'graphql-tag'

export const CREATE_PRODUCT_MUTATION = gql`
  mutation CreateProduct(
    $title: String!
    $description: String!
    $price: Float!
    $rentPrice: Float!
    $rentPeriod: String!
    $categoryIds: [Int!]!
  ) {
    createProduct(
      data: {
        title: $title
        description: $description
        price: $price
        rentPrice: $rentPrice
        rentPeriod: $rentPeriod
        categoryIds: $categoryIds
      }
    ) {
      id
      title
      description
      price
      rentPrice
      rentPeriod
      categories {
        id
        name
      }
    }
  }
`

export const UPDATE_PRODUCT_MUTATION = gql`
  mutation UpdateProduct($id: Int!, $data: ProductUpdateInput!) {
    updateProduct(id: $id, data: $data) {
      id
      title
      description
      price
      rentPrice
      rentPeriod
      categories {
        id
        name
      }
    }
  }
`

export const DELETE_PRODUCT_MUTATION = gql`
  mutation DeleteProduct($id: Int!) {
    deleteProduct(id: $id) {
      id
    }
  }
`
