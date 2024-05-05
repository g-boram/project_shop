import { collection, getDocs, orderBy, query, where } from 'firebase/firestore'
import { store } from './firebase'

// 주문 데이터 가져오기
export const getDetailOrders = async (id: string | undefined) => {
  const docRef = collection(store, 'orders')
  const q = query(
    docRef,
    where('userID', '==', id),
    orderBy('createdAt', 'desc'),
  )
  const querySnapshot = await getDocs(q)
  let documentsArray: any = []

  querySnapshot.forEach((doc) => {
    const data = {
      id: doc.id,
      ...doc.data(),
    }
    documentsArray.push(data)
  })
  return documentsArray
}
