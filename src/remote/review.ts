import { COLLECTIONS } from '@/constants'
import { Review } from '@/models/cosmetic'
import { User } from 'firebase/auth'
import {
  collection,
  deleteDoc,
  doc,
  getDoc,
  getDocs,
  orderBy,
  query,
  setDoc,
} from 'firebase/firestore'
import { store } from './firebase'

export async function getReviewsLength({ cosmeticId }: { cosmeticId: string }) {
  const cosmeticRef = doc(store, COLLECTIONS.COSMETIC, cosmeticId)
  const reviewQuery = query(collection(cosmeticRef, COLLECTIONS.REVIEW))
  const reviewSnapShot = getDocs(reviewQuery)
  const items = (await reviewSnapShot).docs.map((doc) => ({
    id: doc.id,
    ...doc.data(),
  }))
  return items.length
}

export async function getReviews({ cosmeticId }: { cosmeticId: string }) {
  const cosmeticRef = doc(store, COLLECTIONS.COSMETIC, cosmeticId)
  const reviewQuery = query(
    collection(cosmeticRef, COLLECTIONS.REVIEW),
    orderBy('createdAt', 'desc'),
  )
  const reviewSnapShot = await getDocs(reviewQuery)

  const reviews = reviewSnapShot.docs.map((doc) => {
    const review = doc.data()
    return {
      id: doc.id,
      ...review,
      createdAt: review.createdAt.toDate() as Date,
    } as Review
  })

  const userMap: {
    [key: string]: User
  } = {}
  const results: Array<Review & { user: User }> = []

  for (let review of reviews) {
    const cashingUser = userMap[review.userId]

    if (cashingUser == null) {
      const userSnapShot = await getDoc(
        doc(collection(store, COLLECTIONS.USER), review.userId),
      )
      const user = userSnapShot.data() as User

      userMap[review.userId] = user
      results.push({
        ...review,
        user,
      })
    } else {
      results.push({
        ...review,
        user: cashingUser,
      })
    }
  }
  return results
}

// 리뷰 저장하기
export function writeReview(review: Omit<Review, 'id'>) {
  const cosmeticRef = doc(store, COLLECTIONS.COSMETIC, review.cosmeticId)
  const reviewRef = doc(collection(cosmeticRef, COLLECTIONS.REVIEW))

  return setDoc(reviewRef, review)
}

// 리뷰 삭제하기
export function removeReview({
  reviewId,
  cosmeticId,
}: {
  reviewId: string
  cosmeticId: string
}) {
  const cosmeticRef = doc(store, COLLECTIONS.COSMETIC, cosmeticId)
  const reviewRef = doc(collection(cosmeticRef, COLLECTIONS.REVIEW), reviewId)

  return deleteDoc(reviewRef)
}
