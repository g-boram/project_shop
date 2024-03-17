import { css } from '@emotion/react'
import styled from '@emotion/styled'

import Form from '@/components/signup/Form'
import Flex from '@/components/shared/Flex'
import { FormValues } from '@/models/signup'
import { createUserWithEmailAndPassword, updateProfile } from 'firebase/auth'
import { auth, store } from '@/remote/firebase'
import { collection, doc, setDoc } from 'firebase/firestore'
import { COLLECTIONS } from '@/constants'
import { useNavigate } from 'react-router-dom'
import { FirebaseError } from 'firebase/app'
import { useAlertContext } from '@/contexts/AlertContext'
import Text from '@/components/shared/Text'

function SignupPage() {
  const { open } = useAlertContext()
  const navigate = useNavigate()

  const handleSubmit = async (formValues: FormValues) => {
    const { email, password, name, phone, year, month, day, gender } =
      formValues

    const { user } = await createUserWithEmailAndPassword(auth, email, password)

    try {
      await updateProfile(user, {
        displayName: name,
      })

      const newUser = {
        uid: user.uid,
        email: user.email,
        displayName: name,
        phone: phone,
        gender: gender,
        photoURL: '',
        birth: { year: year, month: month, day: day },
      }
      await setDoc(doc(collection(store, COLLECTIONS.USER), user.uid), newUser)

      navigate('/signin')
    } catch (e) {
      if (e instanceof FirebaseError) {
        if (e.code === 'auth/invalid-credential') {
          open({
            title: '입력한 정보를 다시 확인해주세요',
            isCancle: false,
            onCancleClick: () => {},
            onButtonClick: () => {},
          })
          return
        }
        if (e.code === 'auth/email-already-in-use') {
          open({
            title: '이미 가입된 이메일 입니다.',
            isCancle: false,
            onCancleClick: () => {},
            onButtonClick: () => {},
          })
          return
        }
      }
    }
  }

  return (
    <SignupContainer>
      <SignupWrapper>
        <ImgBox>
          <img
            src={
              'https://cdn.pixabay.com/photo/2019/06/02/10/02/mortar-4246084_1280.jpg'
            }
            alt="signin"
          />
        </ImgBox>
        <FormBox>
          <Flex justify="center" align="center" css={formTitle}>
            <Text typography="t1">회원가입</Text>
          </Flex>
          <Form onSubmit={handleSubmit} />
        </FormBox>
      </SignupWrapper>
    </SignupContainer>
  )
}

const SignupContainer = styled.div`
  margin: 0 auto;
  width: 100vw;
  display: flex;
  justify-content: center;
`

const SignupWrapper = styled.div`
  display: flex;
  width: 100%;

  @media (max-width: 600px) {
    gap: 10px;
    flex-direction: column;
  }
  @media (min-width: 600px) {
    max-width: 1000px;
    gap: 10px;
  }
`

const ImgBox = styled.div`
  flex-grow: 0;
  display: flex;
  justify-content: center;
  align-items: center;
  height: 600px;
  padding: 10px;

  & > img {
    width: 100%;
    height: 100%;
    border-radius: 5px;
  }

  @media (max-width: 600px) {
    height: 150px;
    width: 96%;
    padding: 10px;
    margin-top: 0px;

    & img {
      width: 100%;
      height: 100%;
      object-fit: cover;
    }
  }
  @media (min-width: 600px) {
    margin-top: 160px;
    width: 40%;
  }
`

const FormBox = styled.div`
  padding: 50px 20px 20px 20px;
  height: auto;
  flex-grow: 2;

  @media (max-width: 600px) {
    padding: 20px;
  }
`

const formTitle = css`
  flex-shrink: 0;
  height: 100px;

  @media (max-width: 600px) {
    height: 60px;
  }
`
export default SignupPage
