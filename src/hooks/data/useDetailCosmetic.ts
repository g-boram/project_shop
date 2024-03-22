import { useQuery, useQueryClient } from 'react-query'
import { useEffect } from 'react'
import { onSnapshot, collection, doc } from 'firebase/firestore'

import { store } from '@remote/firebase'

import { COLLECTIONS } from '@constants'
import { getDetailCosmetic } from '@/remote/cosmetic'
import { Cosmetic } from '@/models/cosmetic'

function useDetailCosmetic({ cosmeticId }: { cosmeticId: string }) {
  const client = useQueryClient()

  useEffect(() => {
    const unsubscribe = onSnapshot(
      collection(store, COLLECTIONS.COSMETIC, cosmeticId),
      (snapshot) => {
        const newRooms = snapshot.docs.map((doc) => ({
          id: doc.id,
          ...(doc.data() as Cosmetic),
        }))
        client.setQueryData(['detailCosmetic', cosmeticId], newRooms)
      },
    )

    return () => {
      unsubscribe()
    }
  }, [cosmeticId, client])

  return useQuery(
    ['detailCosmetic', cosmeticId],
    () => getDetailCosmetic(cosmeticId),
    {
      suspense: true,
    },
  )
}
export default useDetailCosmetic
