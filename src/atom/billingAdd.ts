import { atom } from 'recoil'

export const billingAddAtom = atom<any | null>({
  key: 'data/billingAdd',
  default: null,
})
