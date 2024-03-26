import { css } from '@emotion/react'

export const typographyMap = {
  t1: css`
    font-size: 30px;
  `,
  t2: css`
    font-size: 26px;
  `,
  t3: css`
    font-size: 22px;
  `,
  t4: css`
    font-size: 20px;
  `,
  t5: css`
    font-size: 17px;
  `,
  t6: css`
    font-size: 15px;
  `,
  t7: css`
    font-size: 13px;
  `,
  t8: css`
    font-size: 11px;
  `,
  t9: css`
    font-size: 9px;
  `,
}

export type Typography = keyof typeof typographyMap
