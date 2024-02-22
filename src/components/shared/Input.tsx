import styled from '@emotion/styled'
import { colors } from '../../styles/colorPalette'

const Input = styled.input`
  padding: 0 16px;
  font-size: 15px;
  height: 48px;
  font-weight: 500:
  border: 1px solid ${colors.inputGrey};
  border-radius: 6px;
  width: 100%;
  box-sizing: border-box;

  &:focus {
    outline: none;
    border-color: ${colors.inputBlue};
  }
  &[aria-invalid='true'] {
    border-color: &{color.inputRed};
  }
`
export default Input
