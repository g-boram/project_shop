import { COLLECTIONS } from '@/constants'
import { Icon, mainCategoryIcon, mainEventBanner } from '@/models/managerMain'
import { store } from '@/remote/firebase'
import {
  doc,
  collection,
  updateDoc,
  getDocs,
  deleteDoc,
  setDoc,
  query,
  orderBy,
  writeBatch,
} from 'firebase/firestore'

// 데이터 베이스

// 데이터베이스 MAIN 컬렉션 데이터 전부 가져오기
export const getMainEventBanner = async () => {
  const docSnap = await getDocs(collection(store, `${COLLECTIONS.MAIN}`))

  const data = docSnap.docs.map((doc) => ({
    ...doc.data(),
    // 문서 아이디로 수정,삭제 구현됨
    fileId: doc.id,
  }))
  return data
}

// 선택한 문서 삭제하기
export const deleteMainBanner = async (id: string) => {
  await deleteDoc(doc(store, `${COLLECTIONS.MAIN}`, id))
}

// 새로운 이미지 문서 저장하기
export const upDateNewImg = async (newData: mainEventBanner) => {
  const upDateRef = doc(collection(store, `${COLLECTIONS.MAIN}`))
  await setDoc(upDateRef, newData)
}

export const getCategoryIcon = async () => {
  const snapshot = await getDocs(
    query(
      collection(store, `${COLLECTIONS.CATEGORYICON}`),
      orderBy('order', 'asc'),
    ),
  )
  return snapshot.docs.map((doc) => ({
    id: doc.id,
    ...doc.data(),
  })) as Icon[]
}

export function updateOrder(icon: Icon[]) {
  const batch = writeBatch(store)

  icon.forEach((icon, index) => {
    batch.update(
      doc(collection(store, `${COLLECTIONS.CATEGORYICON}`), icon.id),
      {
        order: index + 1,
      },
    )
  })

  return batch.commit()
}
