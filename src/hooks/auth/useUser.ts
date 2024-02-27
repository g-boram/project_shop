import { userAtom } from '@/atom/user'
import { useRecoilValue } from 'recoil'

function useUser() {
  return useRecoilValue(userAtom)
}

export default useUser
