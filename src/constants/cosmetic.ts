export interface CosmeticCategoryOption {
  readonly label: string
  readonly value: string | null
}

export const COSMETIC_CATEGORY = [
  { label: '립스틱', value: 'lip' },
  { label: '스킨/앰플', value: 'skin' },
  { label: '미용도구', value: 'tools' },
  { label: '향수', value: 'perfume' },
  { label: '마스카라', value: 'maskara' },
  { label: '마스크/팩', value: 'maskpack' },
  { label: '파운데이션', value: 'foundation' },
  { label: '바디', value: 'body' },
  { label: '아이섀도우', value: 'shadow' },
  { label: '로션/크림', value: 'cream' },
  { label: '선크림', value: 'sunCare' },
]
export const EVENT_TAGBG = [
  { label: '분홍색', value: '#de9eb2' },
  { label: '검정색', value: '#212121' },
  { label: '파랑색', value: '#2396f3' },
  { label: '보라색', value: '#6643b5' },
  { label: '초록색', value: '#4caf50' },
  { label: '노랑색', value: '#ffd700' },
]

export interface ColourOption {
  readonly value: string
  readonly label: string
  readonly color: string
  readonly isFixed?: boolean
  readonly isDisabled?: boolean
}

export const colourOptions: readonly ColourOption[] = [
  { value: '하늘색', label: '하늘색', color: '#00B8D9', isFixed: true },
  { value: '파랑색', label: '파랑색', color: '#0052CC', isDisabled: true },
  { value: '보라색', label: '보라색', color: '#5243AA' },
  { value: '빨강색', label: '빨강색', color: '#FF5630', isFixed: true },
  { value: '주황색', label: '주황색', color: '#FF8B00' },
  { value: '노랑색', label: '노랑색', color: '#FFC400' },
  { value: '초록색', label: '초록색', color: '#00875A' },
  { value: '분홍색', label: '분홍색', color: '#de9eb2' },
  { value: '하얀색', label: '하얀색', color: '#000' },
  { value: '검정색', label: '검정색', color: '#000' },
  { value: '은색', label: '은색', color: '#666666' },
]

export const CATEGORY = [
  { name: '립스틱', value: 'lip' },
  { name: '스킨/앰플', value: 'skin' },
  { name: '미용도구', value: 'tools' },
  { name: '향수', value: 'perfume' },
  { name: '마스카라', value: 'maskara' },
  { name: '마스크/팩', value: 'maskpack' },
  { name: '파운데이션', value: 'foundation' },
  { name: '바디', value: 'body' },
  { name: '아이섀도우', value: 'shadow' },
  { name: '로션/크림', value: 'cream' },
  { name: '선크림', value: 'sunCare' },
]
