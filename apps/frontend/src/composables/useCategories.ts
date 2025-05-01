import { CATEGORIES_QUERY } from '@/graphql/queries/productQueries'
import type { Category } from '@/types/product'
import { useQuery } from '@vue/apollo-composable'
import { computed } from 'vue'

export function useCategories() {
  const { result: categoriesResults, loading: categoryIsLoading } = useQuery<{
    categories: Category[]
  }>(CATEGORIES_QUERY)

  const categories = computed(() => categoriesResults.value?.categories ?? [])

  return {
    categoryIsLoading,
    categories,
  }
}
