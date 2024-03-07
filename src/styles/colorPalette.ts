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
    --btnLightBlue: #aadbff;
    --btnLightPurple: #b4b4ff;
    --btnGreen: #4caf50;
    --btnPink: #de9eb2;
    --btnGrey: #e2e2e2;
    --btnYellow: #ffd700;

    --inputGrey: #e2e2e2;
    --inputRed: #f44336;
    --inputBlue: #2396f3;
    --inputGreen: #4caf50;

    --hoverBlue: #2396f3;
    --hoverGreen: #4caf50;
    --hoverRed: #f44336;

    --fontBlack: #333333;
    --fontGrey: #a8a8a8;
    --fontDarkGrey: #595959;
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
  btnPink: 'var(--btnPink)',
  btnGrey: 'var(--btnGrey)',
  btnYellow: 'var(--btnYellow)',
  btnLightBlue: 'var(--btnLightBlue)',
  btnLightPurple: 'var(--btnLightPurple)',

  hoverRed: 'var(--hoverRed)',
  hoverBlue: 'var(--hoverBlue)',
  hoverGreen: 'var(--hoverGreen)',

  inputGrey: 'var(--inputGrey)',
  inputRed: 'var(--inputRed)',
  inputBlue: 'var(--inputBlue)',
  inputGreen: 'var(--inputGreen)',

  fontBlack: 'var(--fontBlack)',
  fontGrey: 'var(--fontGrey)',
  fontDarkGrey: 'var(--fontDarkGrey)',
}

export type Colors = keyof typeof colors
