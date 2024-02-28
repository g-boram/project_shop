import { css } from '@emotion/react'
import styled from '@emotion/styled'

import Form from '@/components/signup/Form'
import Flex from '@/components/shared/Flex'
import Layout from '@/components/shared/Layout'
import { FormValues } from '@/models/signup'
import { createUserWithEmailAndPassword, updateProfile } from 'firebase/auth'
import { auth, store } from '@/remote/firebase'
import { collection, doc, setDoc } from 'firebase/firestore'
import { COLLECTIONS } from '@/constants'
import { useNavigate } from 'react-router-dom'
import { FirebaseError } from 'firebase/app'
import { useAlertContext } from '@/contexts/AlertContext'

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
            onButtonClick: () => {},
          })
          return
        }
        if (e.code === 'auth/email-already-in-use') {
          open({
            title: '이미 가입된 이메일 입니다.',
            onButtonClick: () => {},
          })
          return
        }
      }
    }
  }

  return (
    <Layout>
      <SignupWrapper>
        <ImgBox>SignupImgBox</ImgBox>
        <FormBox>
          <Flex justify="center" align="center" css={formTitle}>
            회원가입
          </Flex>
          <Form onSubmit={handleSubmit} />
        </FormBox>
      </SignupWrapper>
    </Layout>
  )
}

const SignupWrapper = styled.div`
  display: flex;

  @media (max-width: 600px) {
    gap: 10px;
    flex-direction: column;
  }
  @media (min-width: 600px) {
    gap: 10px;
  }
`

const ImgBox = styled.div`
  background: #002d34;
  flex-grow: 1;
  height: 200px;
  min-width: 300px;
`

const FormBox = styled.div`
  background: #fff;
  padding: 20px;
  height: auto;
  flex-grow: 2;
`

const formTitle = css`
  flex-shrink: 0;
  height: 100px;
  background: pink;
`
export default SignupPage
