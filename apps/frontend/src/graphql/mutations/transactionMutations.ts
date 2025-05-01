import gql from 'graphql-tag'

export const BUY_PRODUCT_MUTATION = gql`
  mutation BuyProduct($productId: Int!) {
    buyProduct(productId: $productId) {
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
export const RENT_PRODUCT_MUTATION = gql`
  mutation RentProduct($data: RentalCreateInput!) {
    rentProduct(data: $data) {
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
