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
import Text from '@/components/shared/Text'

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
              isCancle: false,
              onCancleClick: () => {},
              onButtonClick: () => {},
            })
            return
          }
        }
        // 일반적인 에러
        open({
          title: '잠시 후 다시 시도해주세요.',
          isCancle: false,
          onCancleClick: () => {},
          onButtonClick: () => {},
        })
      }
    },
    [open],
  )

  return (
    <SigninConatiner>
      <SignupWrapper>
        <ImgBox>
          <img
            src={
              'https://cdn.pixabay.com/photo/2021/02/26/11/51/cosmetics-6051633_1280.jpg'
            }
            alt="signin"
          />
        </ImgBox>
        <FormBox>
          <Flex justify="center" align="center" css={formTitle}>
            <Text typography="t1">로그인</Text>
          </Flex>
          <Form onSubmit={handleSubmit} />
        </FormBox>
      </SignupWrapper>
    </SigninConatiner>
  )
}

const SigninConatiner = styled.div`
  margin: 0 auto;
  width: 100%;
  height: 100%;
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
    border-radius: 5px;
    width: 100%;
    height: 100%;
  }

  @media (max-width: 600px) {
    height: 200px;
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
  flex-grow: 1;
`

const formTitle = css`
  flex-shrink: 0;
  height: 100px;
`
export default SigninPage
