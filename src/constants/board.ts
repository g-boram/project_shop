export interface BoardCategoryOption {
  readonly label: string
  readonly value: string | null
}

export const USER_CATEGORY = [
  { label: '정보공유', value: 'info' },
  { label: 'QnA', value: 'qna' },
]
export const MANAGER_CATEGORY = [
  { label: 'Event-이벤트', value: 'event' },
  { label: 'Notice-안내사항', value: 'notice' },
]
