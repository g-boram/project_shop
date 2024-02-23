import { css, keyframes } from '@emotion/react'
import styled from '@emotion/styled'

import Form from '@/components/signup/Form'
import Flex from '@/components/shared/Flex'
import Button from '@/components/shared/Button'
import Spacing from '@/components/shared/Spacing'

function SignupPage() {
  return (
    <SignupWrapper>
      <ImgBox>SignupImgBox</ImgBox>
      <FormBox>
        <Flex
          justify="center"
          align="center"
          css={css`
            ${formTitle}
          `}
        >
          회원가입
        </Flex>
        <Form />
        <Spacing size={100} />
        <Flex justify="center">
          <Button disabled={true} css={btnBottom} onClick={() => {}}>
            회원가입 하기
          </Button>
        </Flex>
      </FormBox>
    </SignupWrapper>
  )
}
const btnBottom = css`
  height: 40px;
  width: 100%;
`
const SignupWrapper = styled.div`
  display: grid;
  height: auto;

  @media (max-width: 600px) {
    grid-template-rows: 0.5fr 3fr;
  }
  @media (min-width: 600px) {
    grid-template-columns: 1fr 1.5fr;
    height: auto;
    min-height: calc(100vh - 70px);
    gap: 10px;
  }
`
const ImgBox = styled.div`
  background: #002d34;
`
const formTitle = css`
  height: 30%;
  background: pink;
`
const FormBox = styled.div`
  background: #fff;
  padding: 20px;
`

export default SignupPage
