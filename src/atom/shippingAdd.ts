import { atom } from 'recoil'

export const shippingAddAtom = atom<any | null>({
  key: 'data/shippingAdd',
  default: null,
})
