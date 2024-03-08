import { COLLECTIONS } from '@/constants'
import { BoardCategoryOption } from '@/constants/board'
import { useAlertContext } from '@/contexts/AlertContext'
import useUser from '@/hooks/auth/useUser'
import { BoardFormProps } from '@/models/board'
import { store } from '@/remote/firebase'
import styled from '@emotion/styled'
import { arrayUnion, doc, updateDoc } from 'firebase/firestore'
import { ChangeEvent, useState } from 'react'
import { toast } from 'react-toastify'
import Button from '../shared/Button'
import Flex from '../shared/Flex'
import Text from '../shared/Text'

interface CommentsProps {
  board: BoardFormProps | null
  getDetailBoard: (id: string) => Promise<void>
}

const CommentBox = ({ board, getDetailBoard }: CommentsProps) => {
  const [comment, setComment] = useState('')
  const user = useUser()
  const { open } = useAlertContext()

  // 댓글 입력
  const setCommentValue = (e: ChangeEvent<HTMLInputElement>) => {
    setComment(e.target.value)
  }
  // 댓글 등록하기
  const onSubmitComment = async () => {
    try {
      if (board && board?.id) {
        const boardRef = doc(store, `${COLLECTIONS.BOARD}`, board.id)

        if (user?.uid) {
          const commentObj = {
            content: comment,
            uid: user.uid,
            displayName: user.displayName,
            photoURL: user.photoURL ? user.photoURL : '',
            createAt: new Date()?.toLocaleDateString('ko', {
              hour: '2-digit',
              minute: '2-digit',
              second: '2-digit',
            }),
          }
          await updateDoc(boardRef, {
            comments: arrayUnion(commentObj),
            updateDated: new Date()?.toLocaleDateString('ko', {
              hour: '2-digit',
              minute: '2-digit',
              second: '2-digit',
            }),
          })
          await getDetailBoard(board.id)
          toast.success('댓글이 등록되었습니다')
          setComment('')
        } else {
          open({
            title: '로그인이 필요한 서비스 입니다',
            onButtonClick: () => {
              //
            },
          })
        }
      }
    } catch (e) {
      console.log('error', e)
    }
  }
  return (
    <CommentContainer>
      <CommentHead>
        <Text typography="t7" color="fontDarkGrey">
          댓글 0개
        </Text>
      </CommentHead>
      <CommentList>
        <CommentLine>유저 이미지/ 이름/ 작성시간/ 내용</CommentLine>
      </CommentList>
      <CommentForm>
        <Flex>
          <UserImg>
            <img src="" alt="" />
          </UserImg>
          <InputBox>
            <input type="text" value={comment} onChange={setCommentValue} />
          </InputBox>
          <Button color="pink" onClick={onSubmitComment}>
            입력
          </Button>
        </Flex>
      </CommentForm>
    </CommentContainer>
  )
}

const CommentHead = styled.div`
  height: 30px;
  background-color: white;
  border-bottom: 5px solid pink;
  padding: 0px 20px;
`
const CommentList = styled.div`
  height: 200px;
  background-color: white;
  border-bottom: 5px solid pink;
  padding: 20px;
`
const UserImg = styled.div``
const CommentLine = styled.div``
const CommentForm = styled.div`
  height: 80px;
  background-color: white;
  margin-top: 20px;
  border: 5px solid pink;
  padding: 20px;
`

const CommentContainer = styled.div`
  height: 500px;
  padding: 20px 0px;
  background-color: #c86b85;
  border-radius: 8px;
`

const InputBox = styled.div`
  height: 40px;
  width: 100%;
  display: flex;
  align-items: center;
  justify-content: center;

  & input {
    border: 1px solid #f4aeba;
    width: 100%;
    padding: 0px 10px;
    border-radius: 5px;
    height: 40px;
  }
`
export default CommentBox
