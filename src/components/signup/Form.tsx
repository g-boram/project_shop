import Flex from '../shared/Flex'
import Label from '../shared/Label'
import Button from '../shared/Button'
import Spacing from '../shared/Spacing'
import TextField from '../shared/TextField'

import { FormValues } from '@/models/signup'
import { DAYS, MONTH, YEARS, YearsOption } from '@/constants/birth'

import { ChangeEvent, useCallback, useEffect, useMemo, useState } from 'react'
import validator from 'validator'
import { css } from '@emotion/react'
import CreatableSelect from 'react-select/creatable'

// 회원가입 폼
function Form({ onSubmit }: { onSubmit: (formValues: FormValues) => void }) {
  // 입력받을 상태값
  const [formValues, setFormValues] = useState<FormValues>({
    password: '',
    rePassword: '',
    name: '',
    email: '',
    phone: '',
  })

  const [year, setYear] = useState<YearsOption | null>()
  const [month, setMonth] = useState<YearsOption | null>()
  const [day, setDay] = useState<YearsOption | null>()
  const [gender, setGender] = useState(0)

  // 입력 되었는지 여부체크
  const [dirty, setDirty] = useState<Partial<FormValues>>({})

  useEffect(() => {
    setFormValues(
      (preValue): FormValues => ({
        ...preValue,
        year: year?.value,
        month: month?.value,
        day: day?.value,
        gender: gender === 0 ? '남' : '여',
      }),
    )
  }, [year, month, day, gender])

  // 입력값 저장
  const handleFormValues = useCallback(
    (e: ChangeEvent<HTMLInputElement> | ChangeEvent<HTMLSelectElement>) => {
      setFormValues((prevFormValues) => ({
        ...prevFormValues,
        [e.target.name]: e.target.value,
      }))
    },
    [],
  )

  const handleBlur = useCallback((e: ChangeEvent<HTMLInputElement>) => {
    setDirty((prevDirty) => ({
      ...prevDirty,
      [e.target.name]: 'true',
    }))
  }, [])

  // error값을 가지고있음
  const errors = useMemo(() => validate(formValues), [formValues])

  // error값이 없는 제출가능한 상태인가
  const isValidate = Object.keys(errors).length === 0

  return (
    <Flex direction="column">
      <Spacing size={10} />
      <TextField
        label="이메일"
        name="email"
        placeholder="abc@email.com"
        value={formValues.email}
        onChange={handleFormValues}
        hasError={Boolean(dirty.email) && Boolean(errors.email)}
        helpMessage={Boolean(dirty.email) ? errors.email : ''}
        onBlur={handleBlur}
      />

      <Spacing size={10} />
      <TextField
        label="패스워드"
        name="password"
        type="password"
        value={formValues.password}
        onChange={handleFormValues}
        hasError={Boolean(dirty.password) && Boolean(errors.password)}
        helpMessage={Boolean(dirty.password) ? errors.password : ''}
        onBlur={handleBlur}
      />
      <Spacing size={10} />
      <TextField
        label="패스워드 재확인"
        name="rePassword"
        type="password"
        value={formValues.rePassword}
        onChange={handleFormValues}
        hasError={Boolean(dirty.rePassword) && Boolean(errors.rePassword)}
        helpMessage={Boolean(dirty.rePassword) ? errors.rePassword : ''}
        onBlur={handleBlur}
      />
      <Spacing size={10} />
      <TextField
        label="이름"
        name="name"
        placeholder="김OO"
        value={formValues.name}
        onChange={handleFormValues}
        hasError={Boolean(dirty.name) && Boolean(errors.name)}
        helpMessage={Boolean(dirty.name) ? errors.name : ''}
        onBlur={handleBlur}
      />
      <Spacing size={10} />

      <TextField
        label="휴대폰 번호"
        name="phone"
        type="number"
        placeholder="숫자만 입력해주세요"
        value={formValues.phone}
        onChange={handleFormValues}
        hasError={Boolean(dirty.phone) && Boolean(errors.phone)}
        helpMessage={Boolean(dirty.phone) ? errors.phone : ''}
        onBlur={handleBlur}
      />
      <Spacing size={10} />

      <Label
        label="생년월일"
        hasError={Boolean(dirty.date) && Boolean(errors.date)}
        helpMessage={Boolean(dirty.date) ? errors.date : ''}
      />
      <Flex>
        <CreatableSelect
          placeholder="Year"
          onChange={(newValue) => setYear(newValue)}
          options={YEARS}
          value={year}
          styles={{
            container: (containerStyles) => ({
              ...containerStyles,
              width: '100%',
              fontSize: '13px',
            }),
            control: (controlStyles) => ({
              ...controlStyles,
              border: '1px solid #e2e2e2',
            }),
          }}
        />
        <Spacing size={10} direction="horizontal" />
        <CreatableSelect
          placeholder="Month"
          onChange={(newValue) => setMonth(newValue)}
          options={MONTH}
          value={month}
          styles={{
            container: (containerStyles) => ({
              ...containerStyles,
              width: '100%',
              fontSize: '13px',
            }),
            control: (controlStyles) => ({
              ...controlStyles,
              border: '1px solid #e2e2e2',
            }),
          }}
        />
        <Spacing size={10} direction="horizontal" />
        <CreatableSelect
          placeholder="Day"
          onChange={(newValue) => setDay(newValue)}
          options={DAYS}
          value={day}
          styles={{
            container: (containerStyles) => ({
              ...containerStyles,
              width: '100%',
              fontSize: '13px',
            }),
            control: (controlStyles) => ({
              ...controlStyles,
              border: '1px solid #e2e2e2',
            }),
          }}
        />
      </Flex>

      <Spacing size={10} />
      <Label label="성별" />
      <Flex>
        <Button
          color={gender === 0 ? 'success' : 'grey'}
          css={btnGender}
          onClick={() => setGender(0)}
        >
          남
        </Button>
        <Spacing size={10} direction="horizontal" />
        <Button
          color={gender === 1 ? 'pink' : 'grey'}
          css={btnGender}
          onClick={() => setGender(1)}
        >
          여
        </Button>
      </Flex>

      <Spacing size={50} />
      <Flex justify="center">
        <Button
          disabled={isValidate === false}
          css={btnBottom}
          onClick={() => {
            onSubmit(formValues)
          }}
        >
          회원가입 하기
        </Button>
      </Flex>
    </Flex>
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

  if (formValues.rePassword.length < 8) {
    errors.rePassword = '비밀번호를 8글자 이상 입력해주세요'
  } else if (
    validator.equals(formValues.rePassword, formValues.password) === false
  ) {
    errors.rePassword = '비밀번호를 확인해주세요'
  }

  if (formValues.name.length < 2) {
    errors.name = '이름은 2글자 이상 입력해주세요'
  }
  if (validator.isMobilePhone(formValues.phone) === false) {
    errors.phone = '핸드폰 번호를 확인해 주세요'
  }

  if (formValues.year === undefined) {
    errors.date = '생년월일(년도)을 입력해주세요'
  }
  if (formValues.month === undefined) {
    errors.date = '생년월일(달)을 확인해주세요'
  }
  if (formValues.day === undefined) {
    errors.date = '생년월일(일)을 확인해주세요'
  }
  return errors
}

const btnGender = css`
  height: 40px;
  width: 100%;
`
const btnBottom = css`
  height: 40px;
  width: 100%;
`
export default Form
