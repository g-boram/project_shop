import { getCosmetics } from '@/remote/cosmetic'
import { useCallback } from 'react'
import { useInfiniteQuery } from 'react-query'

function useCosmetics(category: string) {
  // react-query 에서 제공하는 인피니티 함수 활용하기
  const {
    data,
    hasNextPage = false,
    fetchNextPage,
    isFetching,
  } = useInfiniteQuery(
    ['cosmetics'],
    ({ pageParam }) => getCosmetics(pageParam),
    {
      getNextPageParam: (snapshot) => {
        return snapshot.lastVisiable
      },
    },
  )
  // 더 가져올 페이지가 있는지 여부 판단하는 함수
  const loadMore = useCallback(() => {
    if (hasNextPage === false || isFetching) {
      return
    }

    fetchNextPage()
  }, [fetchNextPage, hasNextPage, isFetching])

  // 데이터를 한번 펼쳐줘야 사용하기 편하다.
  // const cosmetics = data?.pages.map(({ items }) => items).flat()

  const returnData = category
    ? data?.pages
        .map(({ items }) => {
          return items.filter((item) => item.category === category)
        })
        .flat()
    : data?.pages.map(({ items }) => items).flat()

  return { data: returnData, loadMore, isFetching, hasNextPage }
}

export default useCosmetics
