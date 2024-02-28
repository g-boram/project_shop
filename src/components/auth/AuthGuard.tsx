import { userAtom } from '@/atom/user'
import { auth } from '@/remote/firebase'
import { onAuthStateChanged } from 'firebase/auth'
import { useState } from 'react'
import { useSetRecoilState } from 'recoil'

// 인증처리
function AuthGuard({ children }: { children: React.ReactNode }) {
  const [initialize, setInitialize] = useState(false)
  const getToken = sessionStorage.getItem('kakao')
  const setUser = useSetRecoilState(userAtom)

  onAuthStateChanged(auth, (user) => {
    // 로그인 되어 유저값이 있을 경우 atom으로 저장
    if (user != null) {
      setUser({
        uid: user.uid,
        email: user.email ?? '',
        displayName: user.displayName ?? '',
        photoURL: user.photoURL ?? '',
      })
    } else {
      if (getToken !== null) {
        const kakaoToken = JSON.parse(getToken)
        setUser(kakaoToken)
      }
      // 로그인 되지 않았을 경우 null 저장
      setUser(null)
    }
    setInitialize(true)
  })

  // 인증처리가 되지 않았을 경우
  if (initialize === false) {
    return null
  }

  return <>{children}</>
}

export default AuthGuard
