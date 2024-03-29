import { Cosmetic } from '@/models/cosmetic'
import { getCosmeticListAll } from '@/remote/cosmetic'
import { useQuery } from 'react-query'
import { getCategoryIcon, getMainEventBanner } from './useStore'

// 데이터베이스 배너 이미지 가져오기
export function useMainBanner() {
  return useQuery('mainBannerList', getMainEventBanner)
}
// 데이터베이스 아이콘 이미지 가져오기
export function useMainCategoryIcons() {
  return useQuery('mainCategoryIcons', getCategoryIcon)
}

// 별점이 4이상인 데이터
export function useCosmeticHighStarData() {
  return useQuery('useCosmeticData', getCosmeticListAll, {
    select: (data) => data.filter((v) => v.rating > 4),
  })
}

// 특정 이벤트 아이템 가져오기
export function useLipEventCosmetic() {
  return useQuery('useCosmeticData', getCosmeticListAll, {
    select: (data) => data.filter((v) => v.events?.name === 'redLip'),
  })
}
