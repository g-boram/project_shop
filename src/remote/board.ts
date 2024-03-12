import { COLLECTIONS } from '@/constants'
import { BoardFormProps, ChatingProps } from '@/models/board'
import {
  addDoc,
  arrayRemove,
  collection,
  deleteDoc,
  doc,
  getDoc,
  getDocs,
  onSnapshot,
  orderBy,
  query,
  updateDoc,
  where,
} from 'firebase/firestore'
import { store } from './firebase'

// 게시글 저장하기
export const addBoard = async (newBoard: BoardFormProps) => {
  const boardRef = collection(store, `${COLLECTIONS.BOARD}`)
  await addDoc(boardRef, {
    ...newBoard,
    createAt: new Date()?.toLocaleDateString('ko', {
      hour: '2-digit',
      minute: '2-digit',
      second: '2-digit',
    }),
  })
}
// 채팅글 저장하기
export const addChating = async (newChat: ChatingProps) => {
  const boardRef = collection(store, `${COLLECTIONS.CHAT}`)
  await addDoc(boardRef, {
    ...newChat,
    createAt: new Date()?.toLocaleDateString('ko', {
      hour: '2-digit',
      minute: '2-digit',
      second: '2-digit',
    }),
  })
}

// 게시글 전부 가져오기
export const getBoardList = async () => {
  const docSnap = await getDocs(
    query(
      collection(store, `${COLLECTIONS.BOARD}`),
      orderBy('createAt', 'desc'),
    ),
  )

  return docSnap.docs.map(
    (doc) =>
      ({
        id: doc?.id,
        ...doc.data(),
        // 문서 아이디로 수정,삭제 구현됨
      }) as BoardFormProps,
  )
}

// 게시글 수정하기
export const upDateBoard = async (formValue: any, id: string) => {
  const boardRef = doc(store, `${COLLECTIONS.BOARD}`, id)
  await updateDoc(boardRef, formValue)
}

// 선택한 문서 삭제하기
export const deleteBoard = async (id: string) => {
  await deleteDoc(doc(store, `${COLLECTIONS.BOARD}`, id))
}

// 선택한 댓글 삭제하기
export const deleteComment = async (id: string, data: any) => {
  const boardRef = doc(store, `${COLLECTIONS.BOARD}`, id)
  await updateDoc(boardRef, {
    comments: arrayRemove(data),
  })
}
