import {
  QuerySnapshot,
  collection,
  limit,
  query,
  getDocs,
  startAfter,
  getDoc,
  doc,
  where,
  documentId,
  orderBy,
  addDoc,
} from 'firebase/firestore'

import { COLLECTIONS } from '@/constants'
import { store } from './firebase'
import { Cosmetic, Review } from '@/models/cosmetic'
import { User } from '@/models/user'

// 저장된 전체데이터에 인피니티 스크롤 기능 적용하기
export async function getCosmetics(pageParams?: QuerySnapshot<Cosmetic>) {
  const cosmeticsQuery =
    pageParams == null
      ? query(collection(store, COLLECTIONS.COSMETIC), limit(10))
      : query(
          collection(store, COLLECTIONS.COSMETIC),
          startAfter(pageParams),
          limit(10),
        )
  const cosmeticsSnapshot = await getDocs(cosmeticsQuery)

  const items = cosmeticsSnapshot.docs.map(
    (doc) =>
      ({
        id: doc.id,
        ...doc.data(),
      }) as Cosmetic,
  )

  const lastVisiable = cosmeticsSnapshot.docs[cosmeticsSnapshot.docs.length]
  return {
    items,
    lastVisiable,
  }
}

// 저장된 화장품 컬렉션의 전체 데이터를 가져올 함수
export async function getCosmeticList() {
  const snapshot = await getDocs(collection(store, COLLECTIONS.COSMETIC))

  const items = snapshot.docs.map(
    (doc) =>
      ({
        id: doc.id,
        ...doc.data(),
      }) as Cosmetic,
  )
  return items
}

// , orderBy('rating', 'desc')
// 저장된 화장품 컬렉션의 전체 데이터를 가져올 함수
export async function getCosmeticListAll() {
  const snapshot = await getDocs(collection(store, COLLECTIONS.COSMETIC))
  return snapshot.docs.map(
    (doc) =>
      ({
        id: doc.id,
        ...doc.data(),
      }) as Cosmetic,
  )
}

// 저장된 호텔의 데이터를 가져올 함수
export async function getHotel(id: string) {
  const snapshot = await getDoc(doc(store, COLLECTIONS.COSMETIC, id))

  return {
    id,
    ...snapshot.data(),
  } as Cosmetic
}

// 문서중 추천 호텔 아이디를 가지고 있는 데이터를 가져오는 함수
export async function getRecommentHoels(hotelsId: string[]) {
  const recommentQuery = query(
    collection(store, COLLECTIONS.COSMETIC),
    where(documentId(), 'in', hotelsId),
  )
  const snapshot = await getDocs(recommentQuery)

  return snapshot.docs.map(
    (doc) =>
      ({
        id: doc.id,
        ...doc.data(),
      }) as Cosmetic,
  )
}

// 화장품 데이터 저장하기
export const addCosmetic = async (cosmeticData: Cosmetic) => {
  const cosmeticRef = collection(store, `${COLLECTIONS.COSMETIC}`)
  await addDoc(cosmeticRef, {
    ...cosmeticData,
    createAt: new Date()?.toLocaleDateString('ko', {
      hour: '2-digit',
      minute: '2-digit',
      second: '2-digit',
    }),
  })
}
