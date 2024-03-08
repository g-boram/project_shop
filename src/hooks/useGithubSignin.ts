import { signInWithPopup, signOut, GithubAuthProvider } from 'firebase/auth'
import { useCallback } from 'react'
import { collection, doc, setDoc, getDoc } from 'firebase/firestore'
import { useNavigate } from 'react-router-dom'

import { auth, store } from '@remote/firebase'
import { COLLECTIONS } from '@constants'
import { FirebaseError } from 'firebase/app'

function useGithubSignin() {
  const navigate = useNavigate()

  const gitHubSignin = useCallback(async () => {
    const provider = new GithubAuthProvider()

    try {
      const { user } = await signInWithPopup(auth, provider)

      const userSnapshot = await getDoc(
        doc(collection(store, COLLECTIONS.USER), user.uid),
      )

      // 이미 가입한 유저
      if (userSnapshot.exists()) {
        navigate(-1)
      } else {
        const 새로운유저 = {
          uid: user.uid,
          email: user.email,
          displayName: user.displayName,
          photoURL: user.photoURL,
        }

        await setDoc(
          doc(collection(store, COLLECTIONS.USER), user.uid),
          새로운유저,
        )

        navigate('/')
      }
    } catch (error) {
      if (error instanceof FirebaseError) {
        if (error.code === 'auth/popup-closed-by-user') {
          return
        }
      }

      throw new Error('fail to signin')
    }
  }, [navigate])

  const gitHubSignout = useCallback(() => {
    signOut(auth)
  }, [])

  return { gitHubSignin, gitHubSignout }
}

export default useGithubSignin
