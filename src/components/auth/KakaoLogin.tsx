import { useEffect, useState } from 'react'
import axios from 'axios'
import { User } from '@/models/user'
import { useNavigate } from 'react-router-dom'
import { collection, doc, getDoc, setDoc } from 'firebase/firestore'
import { COLLECTIONS } from '@/constants'
import { store } from '@/remote/firebase'
import { useSetRecoilState } from 'recoil'
import { userAtom } from '@/atom/user'

export default function KakaoLogin() {
  const code = new URL(window.location.href).searchParams.get('code')
  const CLIENT_ID = process.env.REACT_APP_KAKAO_REST_API_KEY
  const REDIRECT_URI = process.env.REACT_APP_KAKAO_REDIRECT_URL
  const setUser = useSetRecoilState(userAtom)

  const [kakaoAccessToken, setKakaoAccessToken] = useState<string>('')
  const [kakaoUserInfo, setKakaoUserInfo] = useState<User>({
    uid: '',
    email: '',
    displayName: '',
    photoURL: '',
  })
  const navigate = useNavigate()

  // 토큰이 저장될 경우 유저정보를 구하는 함수 실행
  useEffect(() => {
    if (kakaoAccessToken !== '') getKakaoUserInfo()
  }, [kakaoAccessToken])

  // 유저 정보를 가져왔을 경우 함수 실행
  useEffect(() => {
    if (kakaoUserInfo.uid !== '') setKakaoLoginUser()
  }, [kakaoUserInfo])

  // 카카오 로그인 : 토큰 발급
  useEffect(() => {
    if (code !== null) {
      const getKakaoOauthToken = async () => {
        const makeFormData = (params: { [key: string]: string }) => {
          const searchParams = new URLSearchParams()
          Object.keys(params).forEach((key) => {
            searchParams.append(key, params[key])
          })

          return searchParams
        }

        try {
          const res = await axios({
            method: 'POST',
            headers: {
              'content-type': 'application/x-www-form-urlencoded;charset=utf-8',
            },
            url: 'https://kauth.kakao.com/oauth/token',
            data: makeFormData({
              grant_type: 'authorization_code',
              client_id: CLIENT_ID ? CLIENT_ID : '',
              redirect_uri: REDIRECT_URI ? REDIRECT_URI : '',
              code, // 인가 코드
            }),
          })
          setKakaoAccessToken(res.data.access_token)
        } catch (err) {
          console.log('getKakaoOauthToken Error :', err)
        }
      }
      getKakaoOauthToken()
    }
  }, [code])

  // 카카오 로그인 : 사용자 정보 받기
  const getKakaoUserInfo = async () => {
    try {
      const res = await axios({
        method: 'GET',
        headers: {
          Authorization: `Bearer ${kakaoAccessToken}`,
        },
        url: 'https://kapi.kakao.com/v2/user/me',
      })

      setKakaoUserInfo({
        uid: res.data.id ?? '',
        email: '',
        displayName: res.data.kakao_account.profile.nickname ?? '',
        photoURL: res.data.kakao_account.profile.profile_image_url ?? '',
      })
    } catch (e) {
      console.log('getKakaoUserInfo Error : ', e)
    }
  }

  const setKakaoLoginUser = async () => {
    const userUid = String(kakaoUserInfo.uid)
    const loginUser = {
      uid: String(kakaoUserInfo.uid),
      email: String(kakaoUserInfo.email),
      displayName: String(kakaoUserInfo.displayName),
      photoURL: String(kakaoUserInfo.photoURL),
    }

    try {
      const userSnapshot = await getDoc(
        doc(collection(store, COLLECTIONS.USER), userUid),
      )
      // 이미 가입한 유저
      if (userSnapshot.exists()) {
        navigate(-1)
        setUser(loginUser)
        sessionStorage.setItem('kakao', JSON.stringify(loginUser))
      } else {
        await setDoc(
          doc(collection(store, COLLECTIONS.USER), userUid),
          loginUser,
        )
        setUser(loginUser)
        sessionStorage.setItem('kakao', JSON.stringify(loginUser))
        navigate(-1)
      }
    } catch (error) {
      console.log('카카오 로그인 유저정보 저장 실패', error)
    }
  }

  return (
    <div>
      <h2>KaKao로 로그인하기...</h2>
    </div>
  )
}
