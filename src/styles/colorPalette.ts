import { css } from '@emotion/react'

// 사용하려는 색상 정해두기
export const colorPalette = css`
  :root {
    --red: #f44336;
    --blue: #2396f3;
    --green: #4caf50;
    --white: #fff;
    --black: #212121;
    --grey: #f0efef;

    --btnRed: #f44336;
    --btnBlue: #2396f3;
    --btnGreen: #4caf50;

    --inputGrey: #f0efef;
    --inputRed: #f44336;
    --inputBlue: #2396f3;
    --inputGreen: #4caf50;
  }
`

// 밖에서 colors.red 이런 형태로 사용할 수 있도록 미리 정의
export const colors = {
  red: 'var(--red)',
  blue: 'var(--blue)',
  green: 'var(--green)',
  white: 'var(--white)',
  black: 'var(--black)',
  grey: 'var(--grey)',

  btnRed: 'var(--btnRed)',
  btnBlue: 'var(--btnBlue)',
  btnGreen: 'var(--btnGreen)',

  inputGrey: 'var(--inputGrey)',
  inputRed: 'var(--inputRed)',
  inputBlue: 'var(--inputBlue)',
  inputGreen: 'var(--inputGreen)',
}

export type Colors = keyof typeof colors
