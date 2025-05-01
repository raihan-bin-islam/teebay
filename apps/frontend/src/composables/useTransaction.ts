import {
  BUY_PRODUCT_MUTATION,
  RENT_PRODUCT_MUTATION,
} from '@/graphql/mutations/transactionMutations'
import {
  GET_BORROWED_PRODUCTS,
  GET_BOUGHT_PRODUCTS,
  GET_LENT_PRODUCTS,
  GET_SOLD_PRODUCTS,
} from '@/graphql/queries/transactionQueries'
import type { Product } from '@/types/product'
import { useMutation, useQuery } from '@vue/apollo-composable'
import { computed } from 'vue'

type UseTransactionOptions = { enableQueries?: boolean }
type TransactionProductList = Array<{ product: Product }>
type TransactionHistoryType = {
  myBoughtProducts: TransactionProductList
  mySoldProducts: TransactionProductList
  myBorrowedProducts: TransactionProductList
  myLentProducts: TransactionProductList
}

export function useTransaction(options?: UseTransactionOptions) {
  const enableQueries = options?.enableQueries
  // Queries
  const { result: boughtProductsResult } = useQuery<TransactionHistoryType>(
    GET_BOUGHT_PRODUCTS,
    null,
    {
      enabled: enableQueries,
    },
  )
  const { result: soldProductsResult } = useQuery<TransactionHistoryType>(GET_SOLD_PRODUCTS, null, {
    enabled: enableQueries,
  })
  const { result: borrowedProductsResult } = useQuery<TransactionHistoryType>(
    GET_BORROWED_PRODUCTS,
    null,
    {
      enabled: enableQueries,
    },
  )
  const { result: lentProductsResult } = useQuery<TransactionHistoryType>(GET_LENT_PRODUCTS, null, {
    enabled: enableQueries,
  })

  // Mutations
  const { mutate: buyProduct, loading: isLoadingBuyProduct } = useMutation(BUY_PRODUCT_MUTATION)
  const { mutate: rentProduct, loading: isLoadingRentProduct } = useMutation(RENT_PRODUCT_MUTATION)

  // Results
  const boughtProducts = computed(() =>
    boughtProductsResult?.value?.myBoughtProducts?.flatMap(({ product }) => product),
  )
  const soldProducts = computed(() =>
    soldProductsResult?.value?.mySoldProducts?.flatMap(({ product }) => product),
  )
  const borrowedProducts = computed(() =>
    borrowedProductsResult?.value?.myBorrowedProducts?.flatMap(({ product }) => product),
  )
  const lentProducts = computed(() =>
    lentProductsResult?.value?.myLentProducts?.flatMap(({ product }) => product),
  )

  return {
    boughtProducts,
    soldProducts,
    borrowedProducts,
    lentProducts,

    // Mutations
    buyProduct,
    isLoadingBuyProduct,

    rentProduct,
    isLoadingRentProduct,
  }
}
