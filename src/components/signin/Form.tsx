import useGoogleSignin from '@/hooks/useGoogleSignin'
import { FormValues } from '@/models/signin'
import { colors } from '@/styles/colorPalette'
import { css } from '@emotion/react'
import { ChangeEvent, useCallback, useMemo, useState } from 'react'
import { Link } from 'react-router-dom'
import { SiKakaotalk } from 'react-icons/si'
import { FaGoogle } from 'react-icons/fa'
import { FaGithub } from 'react-icons/fa'
import validator from 'validator'
import Button from '../shared/Button'
import Flex from '../shared/Flex'
import Spacing from '../shared/Spacing'
import Text from '../shared/Text'
import TextField from '../shared/TextField'
import useGithubSignin from '@/hooks/useGithubSignin'
import styled from '@emotion/styled'

function Form({ onSubmit }: { onSubmit: (formValues: FormValues) => void }) {
  const REST_API_KEY = process.env.REACT_APP_KAKAO_REST_API_KEY
  const REDIRECT_URI = process.env.REACT_APP_KAKAO_REDIRECT_URL
  const link = `https://kauth.kakao.com/oauth/authorize?client_id=${REST_API_KEY}&redirect_uri=${REDIRECT_URI}&response_type=code`

  const loginHandler = () => {
    window.location.href = link
  }
  const { googleSignin } = useGoogleSignin()
  const { gitHubSignin } = useGithubSignin()

  const [formValues, setFormValues] = useState({
    email: '',
    password: '',
  })

  // 입력 되었는지 여부체크
  const [dirty, setDirty] = useState<Partial<FormValues>>({})

  const handleFormValues = useCallback((e: ChangeEvent<HTMLInputElement>) => {
    setFormValues((preFormValues) => ({
      ...preFormValues,
      [e.target.name]: e.target.value,
    }))
  }, [])

  // 입력 확인
  const handleBlur = useCallback((e: ChangeEvent<HTMLInputElement>) => {
    setDirty((prevDirty) => ({
      ...prevDirty,
      [e.target.name]: 'true',
    }))
  }, [])

  // error 값
  const errors = useMemo(() => validate(formValues), [formValues])
  // error값이 없는 제출가능한 상태인가
  const isValidate = Object.keys(errors).length === 0

  return (
    <div>
      <SNSBtnBox>
        {/* Kakao 로그인 */}
        <Button
          color="yellow"
          onClick={loginHandler}
          css={css`
            width: 100%;
            height: 40px;
          `}
        >
          <Flex align="center" justify="center">
            <SiKakaotalk size={24} fill={'white'} />
            <Spacing direction="horizontal" size={20} />
            Kakao 로그인
          </Flex>
        </Button>
        <Spacing size={10} />
        {/* Google 로그인 */}
        <Button
          color="lightBlue"
          onClick={googleSignin}
          css={css`
            width: 100%;
            height: 40px;
          `}
        >
          <Flex align="center" justify="center">
            <FaGoogle size={23} />
            <Spacing direction="horizontal" size={18} />
            Google 로그인
          </Flex>
        </Button>
        <Spacing size={10} />

        {/* GitHub 로그인 */}
        <Button
          color="lightPurple"
          onClick={gitHubSignin}
          css={css`
            width: 100%;
            height: 40px;
          `}
        >
          <Flex align="center" justify="center">
            <FaGithub size={24} />
            <Spacing direction="horizontal" size={18} />
            GitHub 로그인
          </Flex>
        </Button>
      </SNSBtnBox>

      <Flex direction="column">
        <Spacing size={10} />
        <TextField
          label="이메일"
          name="email"
          placeholder="abc@abc.com"
          onChange={handleFormValues}
          value={formValues.email}
          hasError={Boolean(dirty.email) && Boolean(errors.email)}
          helpMessage={Boolean(dirty.email) ? errors.email : ''}
          onBlur={handleBlur}
        />
        <TextField
          label="패스워드"
          name="password"
          type="password"
          onChange={handleFormValues}
          value={formValues.password}
          hasError={Boolean(dirty.password) && Boolean(errors.password)}
          helpMessage={Boolean(dirty.password) ? errors.password : ''}
          onBlur={handleBlur}
        />

        <Spacing size={50} />
        <Button
          size="small"
          color="pink"
          disabled={isValidate === false}
          onClick={() => {
            onSubmit(formValues)
          }}
        >
          로그인 하기
        </Button>

        <Spacing size={15} />
        <Link to="/signup" css={linkStyles}>
          <Text typography="t8" color="black">
            이메일 계정 만들러 가기
          </Text>
        </Link>
      </Flex>
    </div>
  )
}

// 유효성 체크하기
function validate(formValues: FormValues) {
  let errors: Partial<FormValues> = {}

  if (validator.isEmail(formValues.email) === false) {
    errors.email = '이메일 형식을 확인해주세요'
  }

  if (formValues.password.length < 8) {
    errors.password = '비밀번호를 8글자 이상 입력해주세요'
  }

  return errors
}

// CSS
const linkStyles = css`
  text-align: center;
  & > span:hover {
    color: ${colors.hoverPink};
  }
`

const SNSBtnBox = styled.div`
  height: 300px;
  display: flex;
  flex-direction: column;
  justify-content: center;

  @media (max-width: 600px) {
    height: 200px;
  }
`
export default Form
