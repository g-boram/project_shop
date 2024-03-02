import { COLLECTIONS } from '@/constants'
import { mainEventBanner } from '@/models/managerMain'
import { store } from '@/remote/firebase'
import {
  doc,
  collection,
  updateDoc,
  getDocs,
  deleteDoc,
  setDoc,
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
