import { css } from '@emotion/react'
import { colors } from './colorPalette'

export const buttonColorMap = {
  primary: css`
    background-color: ${colors.btnBlue};
    color: ${colors.white};
  `,
  success: css`
    background-color: ${colors.btnGreen};
    color: ${colors.white};
  `,
  error: css`
    background-color: ${colors.btnRed};
    color: ${colors.white};
  `,
  lightBlue: css`
    background-color: ${colors.btnLightBlue};
    color: ${colors.white};
    &:hover {
      background-color: #64d6ff;
      transition: 0.5s;
    }
  `,
  lightPurple: css`
    background-color: ${colors.btnLightPurple};
    color: ${colors.white};
    &:hover {
      background-color: #a0a0ff;
      transition: 0.5s;
    }
  `,
  purple: css`
    background-color: ${colors.btnPurple};
    color: ${colors.white};
    &:hover {
      background-color: #50358f;
      transition: 0.5s;
    }
  `,
  pink: css`
    background-color: ${colors.btnPink};
    color: ${colors.white};
    &:hover {
      background-color: #c86b85;
      transition: 0.5s;
    }
  `,
  grey: css`
    background-color: ${colors.btnGrey};
    color: ${colors.white};
    &:hover {
      background-color: #9b9b9b;
      transition: 0.5s;
    }
  `,
  white: css`
    background-color: ${colors.white};
    color: ${colors.black};
  `,
  yellow: css`
    background-color: ${colors.btnYellow};
    color: ${colors.white};
    &:hover {
      background-color: #ffc300;
      transition: 0.5s;
    }
  `,
}

export const buttonWeakMap = {
  primary: css`
    background-color: ${colors.white};
    color: ${colors.btnBlue};
    border: 1px solid ${colors.btnBlue};
  `,
  success: css`
    background-color: ${colors.white};
    color: ${colors.btnGreen};
    border: 1px solid ${colors.btnGreen};
  `,
  error: css`
    background-color: ${colors.white};
    color: ${colors.btnRed};
    border: 1px solid ${colors.btnRed};
  `,
  pink: css`
    background-color: ${colors.white};
    color: ${colors.btnPink};
    border: 1px solid ${colors.btnPink};
  `,
  grey: css`
    background-color: ${colors.white};
    color: ${colors.btnGrey};
    border: 1px solid ${colors.btnGrey};
  `,
  white: css`
    background-color: ${colors.white};
    color: ${colors.black};
    border: 1px solid ${colors.white};
  `,
  yellow: css`
    background-color: ${colors.white};
    color: ${colors.btnYellow};
    border: 1px solid ${colors.btnYellow};
  `,
  purple: css`
    background-color: ${colors.white};
    color: ${colors.btnPurple};
    border: 1px solid ${colors.btnPurple};
  `,
  lightBlue: css`
    background-color: ${colors.white};
    color: ${colors.btnLightBlue};
    border: 1px solid ${colors.btnLightBlue};
  `,
  lightPurple: css`
    background-color: ${colors.white};
    color: ${colors.btnLightPurple};
    border: 1px solid ${colors.btnLightPurple};
  `,
}

export const buttonSizeMap = {
  small: css`
    font-size: 13px;
    padding: 8px 9px;
  `,
  medium: css`
    font-size: 15px;
    padding: 10px 15px;
  `,
  large: css`
    font-size: 18px;
    padding: 12px 10px;
  `,
}

export type ButtonColor = keyof typeof buttonColorMap
export type ButtonSize = keyof typeof buttonSizeMap
