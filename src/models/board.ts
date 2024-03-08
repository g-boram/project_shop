export interface BoardFormProps {
  uid: string | undefined
  email: string | undefined
  name: string | undefined
  category?: string | null
  id?: string | undefined
  title?: string | undefined
  content?: string | undefined
  createAt?: string | undefined
  updateAt?: string | undefined
  comments?: CommentsInterface[]
}

export interface CommentsInterface {
  content: string
  uid: string
  displayName: string
  createdAt: string
  photoUrl: string
}
export interface ChatingProps {
  id?: string
  content: string
  createAt?: string
  uid?: string
  email?: string
  name?: string
  photoURL?: string
}

export type BoardCategoryType = 'info' | 'event' | 'notice' | 'chat' | 'qna'
export const BOARDCATEGORUES: BoardCategoryType[] = [
  'info',
  'event',
  'notice',
  'chat',
  'qna',
]
