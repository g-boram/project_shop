import styled from '@emotion/styled'
import Button from '../shared/Button'
import Flex from '../shared/Flex'
import Spacing from '../shared/Spacing'
import Text from '../shared/Text'
import useUser from '@/hooks/auth/useUser'
import CommentBox from './CommentBox'

import { COLLECTIONS } from '@/constants'
import { BoardFormProps } from '@/models/board'
import { store } from '@/remote/firebase'
import { css } from '@emotion/react'
import { doc, getDoc } from 'firebase/firestore'
import { useEffect, useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import { MoonLoader } from 'react-spinners'
import { useAlertContext } from '@/contexts/AlertContext'
import { toast } from 'react-toastify'
import { deleteBoard } from '@/remote/board'

const BoardDetailForm = () => {
  const params = useParams()
  const user = useUser()
  const navigate = useNavigate()
  const { open } = useAlertContext()

  const [board, setBoard] = useState<BoardFormProps | null>(null)

  // 게시판 데이터 가져오기
  const getDetailBoard = async (id: string) => {
    const docRef = doc(store, `${COLLECTIONS.BOARD}`, id)
    const docSnap = await getDoc(docRef)

    setBoard({ id: docSnap.id, ...(docSnap.data() as BoardFormProps) })
  }

  useEffect(() => {
    if (params?.id) getDetailBoard(params?.id)
  }, [params?.id])

  const changeValue = (val: any) => {
    if (val === 'info') return '정보공유'
    if (val === 'qna') return 'QnA'
    if (val === 'event') return '이벤트'
    if (val === 'notice') return '공지사항'
  }

  const handleBoardDelete = () => {
    if (board?.id) {
      deleteBoard(board.id)
      toast.success('게시글 삭제 완료!')
      navigate(-1)
    }
  }

  return (
    <>
      {board ? (
        <>
          <NoticeBox>
            <Flex
              align={'center'}
              css={css`
                height: 100%;
              `}
            >
              <Label>{changeValue(board?.category)}</Label>
              <Spacing size={10} direction={'horizontal'} />
              <Text typography="t6">{board.title}</Text>
            </Flex>
          </NoticeBox>
          <Flex
            justify={'flex-end'}
            align={'flex-end'}
            direction={'column'}
            css={formTitleStyle}
          >
            <Text typography="t6">{board.name}</Text>
            <Text typography="t7" color="fontDarkGrey">
              {board.createAt?.slice(0, 20)}
            </Text>
          </Flex>
          <FormContainer>{board.content}</FormContainer>
          <Spacing size={20} />

          <Flex justify={'center'}>
            {user?.uid === board.uid ? (
              <>
                <Button
                  size="medium"
                  color="primary"
                  onClick={() => navigate(`/board/edit/${board.id}`)}
                >
                  수정
                </Button>
                <Spacing size={15} direction={'horizontal'} />
                <Button
                  size="medium"
                  color="lightPurple"
                  onClick={() => navigate(-1)}
                >
                  뒤로가기
                </Button>
                <Spacing size={15} direction={'horizontal'} />
                <Button
                  size="medium"
                  color="error"
                  onClick={() =>
                    open({
                      title: '게시글을 삭제 하시겠습니까?',
                      description: '삭제시 복구가 되지않습니다.',
                      onCancleClick: () => {},
                      onButtonClick: () => {
                        handleBoardDelete()
                      },
                    })
                  }
                >
                  삭제
                </Button>
              </>
            ) : (
              <Button
                size="medium"
                color="lightPurple"
                onClick={() => navigate(-1)}
              >
                뒤로가기
              </Button>
            )}
          </Flex>
        </>
      ) : (
        <FormLoadContainer>
          <MoonLoader color="pink" />
        </FormLoadContainer>
      )}
      <Spacing size={20} />
      <CommentBox board={board} getDetailBoard={getDetailBoard} />
      <Spacing size={20} />
    </>
  )
}

const formTitleStyle = css`
  height: 100px;
  border-bottom: 5px solid pink;
  height: 100px;
  margin-bottom: 20px;
`

const FormContainer = styled.div`
  min-height: 300px;
  max-height: 400px;
  padding: 20px 15px;
  overflow: scroll;
  border: 2px solid #f3d7ca;
  border-radius: 5px;
`

const FormLoadContainer = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  height: 600px;
  border: 2px solid #f3d7ca;
  border-radius: 5px;
`

const Label = styled.div`
  min-width: 15%;
  height: 40px;
  display: flex;
  margin-right: 10px;
  align-items: center;
  justify-content: flex-start;
  font-size: 14px;
  border-radius: 5px;
  padding: 0 10px;
  color: #fff;
  font-weight: bold;
  background-color: #c86b85;
`

const NoticeBox = styled.div`
  background-color: white;
  padding: 0 10px;
  border: 2px solid #f9ecec;
  box-shadow: 0px 0px 10px -2px #ffbdd2;
  height: 60px;
  border-radius: 8px;
  margin-bottom: 20px;
`
export default BoardDetailForm
