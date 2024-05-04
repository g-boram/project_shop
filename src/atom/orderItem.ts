import { atom } from 'recoil'

export const orderItemAtom = atom<any | null>({
  key: 'data/order',
  default: null,
})
