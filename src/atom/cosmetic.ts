import { Cosmetic } from '@/models/cosmetic'
import { atom } from 'recoil'

export const cosmeticAtom = atom<Cosmetic[] | null>({
  key: 'data/cometic',
  default: null,
})
