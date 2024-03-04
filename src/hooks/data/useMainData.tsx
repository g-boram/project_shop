import { useQuery } from 'react-query'
import { getCategoryIcon, getMainEventBanner } from './useStore'

// 데이터베이스 이미지데이터 가져오기
export function useMainBanner() {
  return useQuery('mainBannerList', getMainEventBanner)
}
// 데이터베이스 이미지데이터 가져오기
export function useMainCategoryIcons() {
  return useQuery('mainCategoryIcons', getCategoryIcon)
}
