import { cosmeticAtom } from '@/atom/cosmetic'
import { useRecoilValue } from 'recoil'

function useSearchCosmetics() {
  return useRecoilValue(cosmeticAtom)
}

export default useSearchCosmetics
