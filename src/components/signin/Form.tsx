import useGoogleSignin from '@/hooks/useGoogleSignin'
import { FormValues } from '@/models/signin'
import { colors } from '@/styles/colorPalette'
import { css } from '@emotion/react'
import { ChangeEvent, useCallback, useMemo, useState } from 'react'
import { Link } from 'react-router-dom'
import validator from 'validator'
import Button from '../shared/Button'
import Flex from '../shared/Flex'
import Spacing from '../shared/Spacing'
import Text from '../shared/Text'
import TextField from '../shared/TextField'

function Form({ onSubmit }: { onSubmit: (formValues: FormValues) => void }) {
  const { signin } = useGoogleSignin()

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
      <Spacing size={10} />
      {/* Google 로그인 */}
      <Button
        color="pink"
        onClick={signin}
        css={css`
          width: 100%;
        `}
      >
        <Flex align="center" justify="center">
          <img
            src="https://cdn3.iconfinder.com/data/icons/logos-brands-3/24/logo_brand_brands_logos_google-64.png"
            alt=""
            width={20}
            height={20}
          />
          <Spacing direction="horizontal" size={10} />
          Google 로그인
        </Flex>
      </Button>

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
          disabled={isValidate === false}
          onClick={() => {
            onSubmit(formValues)
          }}
        >
          로그인 하기
        </Button>

        <Spacing size={15} />
        <Link to="signup" css={linkStyles}>
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
    color: ${colors.hoverBlue};
  }
`
export default Form
