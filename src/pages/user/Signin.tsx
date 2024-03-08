import Flex from '@/components/shared/Flex'
import Form from '@/components/signin/Form'
import styled from '@emotion/styled'
import { css } from '@emotion/react'
import { useAlertContext } from '@/contexts/AlertContext'
import { FormValues } from '@/models/signin'
import { auth } from '@/remote/firebase'
import { FirebaseError } from 'firebase/app'
import { signInWithEmailAndPassword } from 'firebase/auth'
import { useCallback } from 'react'
import { useNavigate } from 'react-router-dom'

function SigninPage() {
  const { open } = useAlertContext()
  const navigate = useNavigate()

  const handleSubmit = useCallback(
    async (formValues: FormValues) => {
      const { email, password } = formValues

      try {
        await signInWithEmailAndPassword(auth, email, password)

        navigate(-1)
      } catch (e) {
        console.log('err', e)
        // firebase 의 에러
        if (e instanceof FirebaseError) {
          if (e.code === 'auth/invalid-credential') {
            open({
              title: '입력한 정보를 다시 확인해주세요',
              onButtonClick: () => {
                //
              },
            })
            return
          }
        }
        // 일반적인 에러
        open({
          title: '잠시 후 다시 시도해주세요.',
          onButtonClick: () => {
            //
          },
        })
      }
    },
    [open],
  )

  return (
    <SignupWrapper>
      <ImgBox>SignupImgBox</ImgBox>
      <FormBox>
        <Flex justify="center" align="center" css={formTitle}>
          로그인
        </Flex>
        <Form onSubmit={handleSubmit} />
      </FormBox>
    </SignupWrapper>
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
  flex-grow: 0;
  height: 200px;

  @media (max-width: 600px) {
    width: 100%;
  }
  @media (min-width: 600px) {
    width: 40%;
  }
`

const FormBox = styled.div`
  background: #fff;
  padding: 20px;
  height: auto;
  flex-grow: 1;
`

const formTitle = css`
  flex-shrink: 0;
  height: 100px;
  background: pink;
`
export default SigninPage
