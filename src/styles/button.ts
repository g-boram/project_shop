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