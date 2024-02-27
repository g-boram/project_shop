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

function SignupPage() {
  const handleSubmit = async (formValues: FormValues) => {
    const { email, password, name, phone, year, month, day, gender } =
      formValues

    const { user } = await createUserWithEmailAndPassword(auth, email, password)

    await updateProfile(user, {
      displayName: name,
    })

    const newUser = {
      uid: user.uid,
      email: user.email,
      displayName: name,
      phone: phone,
      gender: gender,
      birth: { year: year, month: month, day: day },
    }

    await setDoc(doc(collection(store, COLLECTIONS.USER), user.uid), newUser)
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

const formTitle = css`
  flex-shrink: 0;
  height: 100px;
  background: pink;
`
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

export default SignupPage
