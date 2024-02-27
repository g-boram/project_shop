import { InputHTMLAttributes } from 'react'

import Text from './Text'
import Flex from './Flex'
import { Colors } from '@/styles/colorPalette'

interface TextFieldProps extends InputHTMLAttributes<HTMLInputElement> {
  label?: React.ReactNode
  hasError?: boolean
  helpMessage?: React.ReactNode
  labelColor?: Colors
}

function Label({ label, hasError, helpMessage }: TextFieldProps) {
  const labelColor = hasError ? 'inputRed' : 'black'

  return (
    <Flex align={'center'} justify={'space-between'}>
      {label ? (
        <Text
          typography="t7"
          color={labelColor}
          display="inline-block"
          style={{ marginTop: 10, marginBottom: 6 }}
        >
          {label}
        </Text>
      ) : null}
      {helpMessage ? (
        <Text
          typography="t7"
          color={labelColor}
          display="inline-block"
          style={{ marginTop: 10, marginBottom: 6, fontSize: 11 }}
        >
          {helpMessage}
        </Text>
      ) : null}
    </Flex>
  )
}

export default Label
