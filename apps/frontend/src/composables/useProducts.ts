import { computed } from 'vue'
import { useLazyQuery, useMutation } from '@vue/apollo-composable'
import {
  CREATE_PRODUCT_MUTATION,
  DELETE_PRODUCT_MUTATION,
  UPDATE_PRODUCT_MUTATION,
} from '@/graphql/mutations/productMutations'
import {
  GET_ALL_PRODUCTS,
  GET_PRODUCT_BY_ID,
  MY_PRODUCTS_QUERY,
  PRODUCT_BY_ID_QUERY,
} from '@/graphql/queries/productQueries'
import type { Product } from '@/types/product'

export function useProducts() {
  // Queries
  const {
    load: fetchMyProducts,
    result: myProductResults,
    loading: isLoadingMyProducts,
  } = useLazyQuery<{
    myProducts: Product[]
  }>(MY_PRODUCTS_QUERY)

  const {
    load: fetchMyProductById,
    result: myProductByIdResult,
    loading: isLoadingMyProductById,
  } = useLazyQuery<{
    myProduct: Product
  }>(PRODUCT_BY_ID_QUERY)

  const {
    load: fetchAllProducts,
    result: allProductsResult,
    loading: isLoadingAllProducts,
  } = useLazyQuery<{
    products: Product[]
  }>(GET_ALL_PRODUCTS)

  const {
    load: fetchProductById,
    result: productByIdResult,
    loading: isLoadingProductById,
  } = useLazyQuery<{
    product: Product
  }>(GET_PRODUCT_BY_ID)

  // Mutations
  const {
    mutate: createProduct,
    loading: creatingProduct,
    onDone: onCreateDone,
    onError: onCreateError,
  } = useMutation(CREATE_PRODUCT_MUTATION, {
    update(cache, { data }) {
      if (!data?.createProduct) return

      // Read the existing list
      const existing = cache.readQuery<{ myProducts: Product[] }>({
        query: MY_PRODUCTS_QUERY,
      })

      if (existing?.myProducts) {
        // Append the new product
        cache.writeQuery({
          query: MY_PRODUCTS_QUERY,
          data: {
            myProducts: [...existing.myProducts, data.createProduct],
          },
        })
      }
    },
  })

  const {
    mutate: updateProduct,
    loading: updatingProduct,
    onDone: onUpdateDone,
    onError: onUpdateError,
  } = useMutation(UPDATE_PRODUCT_MUTATION, {
    update(cache, { data }) {
      if (!data?.updateProduct?.id) return

      const existing = cache.readQuery<{ myProducts: Product[] }>({
        query: MY_PRODUCTS_QUERY,
      })

      if (existing?.myProducts) {
        const updatedProducts = existing.myProducts.map((product) =>
          product.id === data.updateProduct.id ? data.updateProduct : product,
        )

        cache.writeQuery({
          query: MY_PRODUCTS_QUERY,
          data: {
            myProducts: updatedProducts,
          },
        })
      }
    },
  })

  const {
    mutate: deleteProduct,
    loading: deletingProduct,
    onDone: onDeleteDone,
    onError: onDeleteError,
  } = useMutation(DELETE_PRODUCT_MUTATION, {
    update(cache, { data }) {
      if (!data?.deleteProduct?.id) return

      // Read the existing list
      const existing = cache.readQuery<{ myProducts: Product[] }>({
        query: MY_PRODUCTS_QUERY,
      })

      if (existing?.myProducts) {
        // Filter out the deleted product
        cache.writeQuery({
          query: MY_PRODUCTS_QUERY,
          data: {
            myProducts: existing.myProducts.filter(
              (product) => product.id !== data.deleteProduct.id,
            ),
          },
        })
      }
    },
  })

  const myProducts = computed(() => myProductResults.value?.myProducts ?? [])
  const myProductById = computed(() => myProductByIdResult.value?.myProduct ?? [])
  const allProducts = computed(() => allProductsResult.value?.products ?? [])
  const productById = computed(() => productByIdResult.value?.product ?? [])

  return {
    fetchMyProducts,
    isLoadingMyProducts,
    myProducts,

    fetchMyProductById,
    isLoadingMyProductById,
    myProductById,

    fetchAllProducts,
    isLoadingAllProducts,
    allProducts,

    fetchProductById,
    isLoadingProductById,
    productById,

    // Mutations
    createProduct,
    creatingProduct,
    onCreateDone,
    onCreateError,
    updateProduct,

    updatingProduct,
    onUpdateDone,
    onUpdateError,
    deleteProduct,

    deletingProduct,
    onDeleteDone,
    onDeleteError,
  }
}
