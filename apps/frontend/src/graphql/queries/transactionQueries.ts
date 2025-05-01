import gql from 'graphql-tag'

export const GET_BOUGHT_PRODUCTS = gql`
  query GetBoughtProducts {
    myBoughtProducts {
      product {
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
  }
`
export const GET_SOLD_PRODUCTS = gql`
  query GetSoldProducts {
    mySoldProducts {
      product {
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
  }
`
export const GET_BORROWED_PRODUCTS = gql`
  query GetBorrowedProducts {
    myBorrowedProducts {
      product {
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
  }
`
export const GET_LENT_PRODUCTS = gql`
  query GetLentProducts {
    myLentProducts {
      product {
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
  }
`
