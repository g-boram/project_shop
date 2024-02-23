import { colors } from '@styles/colorPalette'
import styled from '@emotion/styled'

const Input = styled.input`
  padding: 0 16px;
  font-size: 12px;
  height: 40px;
  font-weight: 500;
  border: 1px solid ${colors.inputGrey};
  border-radius: 6px;
  width: 100%;
  box-sizing: border-box;

  &:focus {
    outline: none;
    border-color: ${colors.blue};
  }

  &[aria-invalid='true'] {
    border-color: ${colors.red};
  }
`

export default Input
