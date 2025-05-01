import gql from 'graphql-tag'

export const MY_PRODUCTS_QUERY = gql`
  query MyProducts {
    myProducts {
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
export const PRODUCT_BY_ID_QUERY = gql`
  query ProductById($id: Int!) {
    myProduct(id: $id) {
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
export const GET_ALL_PRODUCTS = gql`
  query GetAllProducts {
    products {
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
export const GET_PRODUCT_BY_ID = gql`
  query GetProductById($id: Int!) {
    product(id: $id) {
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

export const CATEGORIES_QUERY = gql`
  query CategoriesQuery {
    categories {
      id
      name
    }
  }
`
