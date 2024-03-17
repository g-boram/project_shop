import { getReviews, writeReview, removeReview } from '@/remote/review'
import { useMutation, useQuery, useQueryClient } from 'react-query'
import useUser from '../auth/useUser'

// 리뷰 가져오기 / 등록하기
function useReview({ cosmeticId }: { cosmeticId: string }) {
  const user = useUser()
  const client = useQueryClient()

  const { data, isLoading } = useQuery(['reviews', cosmeticId], () =>
    getReviews({ cosmeticId }),
  )

  const { mutateAsync: write } = useMutation(
    async (text: string) => {
      const newReview = {
        createdAt: new Date(),
        cosmeticId,
        userId: user?.uid as string,
        text,
      }

      await writeReview(newReview)

      return true
    },
    {
      onSuccess: () => {
        client.invalidateQueries(['reviews', cosmeticId])
      },
    },
  )

  const { mutate: remove } = useMutation(
    ({ reviewId, cosmeticId }: { reviewId: string; cosmeticId: string }) => {
      return removeReview({ reviewId, cosmeticId })
    },
    {
      onSuccess: () => {
        client.invalidateQueries(['reviews', cosmeticId])
      },
    },
  )

  return { data, isLoading, write, remove }
}

export default useReview
