import {
  FocusEventHandler,
  forwardRef,
  InputHTMLAttributes,
  useState,
} from 'react'

import Text from './Text'
import Input from './Input'
import Flex from './Flex'

interface TextFieldProps extends InputHTMLAttributes<HTMLInputElement> {
  label?: React.ReactNode
  hasError?: boolean
  helpMessage?: React.ReactNode
}

const TextField = forwardRef<HTMLInputElement, TextFieldProps>(
  function TextField(
    { label, hasError, helpMessage, onFocus, onBlur, ...props },
    ref,
  ) {
    const [focused, setFocused] = useState(false)

    const labelColor = hasError ? 'inputRed' : focused ? 'inputBlue' : undefined

    const handleFocus: FocusEventHandler<HTMLInputElement> = (event) => {
      setFocused(true)
      onFocus?.(event)
    }

    const handleBlur: FocusEventHandler<HTMLInputElement> = (event) => {
      setFocused(false)
      onBlur?.(event)
    }

    return (
      <div>
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
        <Input
          ref={ref}
          aria-invalid={hasError}
          onFocus={handleFocus}
          onBlur={handleBlur}
          {...props}
        />
      </div>
    )
  },
)

export default TextField
