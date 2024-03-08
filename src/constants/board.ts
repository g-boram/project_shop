export interface BoardCategoryOption {
  readonly label: string
  readonly value: string | null
}

export const USER_CATEGORY = [
  { label: '정보공유', value: 'info' },
  { label: 'QnA', value: 'qna' },
]
