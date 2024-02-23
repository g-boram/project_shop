import { css } from '@emotion/react'
import Button from '../shared/Button'
import FixedBottomButton from '../shared/FixedBottomButton'
import Flex from '../shared/Flex'
import Spacing from '../shared/Spacing'
import TextField from '../shared/TextField'

// 회원가입 폼
function Form() {
  return (
    <Flex direction="column">
      <Spacing size={100} />
      <TextField label="이메일" placeholder="abc@email.com" />
      <Spacing size={10} />
      <TextField label="패스워드" type="password" />
      <Spacing size={10} />
      <TextField label="패스워드 재확인" type="password" />
      <Spacing size={10} />
      <TextField label="이름" placeholder="김OO" />
    </Flex>
  )
}

export default Form
