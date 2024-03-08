import { COLLECTIONS } from '@/constants'
import { BoardFormProps } from '@/models/board'
import { store } from '@/remote/firebase'
import { css } from '@emotion/react'
import { arrayUnion, doc, getDoc, updateDoc } from 'firebase/firestore'
import { ChangeEvent, useEffect, useState } from 'react'
import { Link, useNavigate, useParams } from 'react-router-dom'

import styled from '@emotion/styled'
import Button from '../shared/Button'
import Flex from '../shared/Flex'
import Spacing from '../shared/Spacing'
import Text from '../shared/Text'
import useUser from '@/hooks/auth/useUser'
import { MoonLoader } from 'react-spinners'
import { text } from 'stream/consumers'
import { useAlertContext } from '@/contexts/AlertContext'
import { toast } from 'react-toastify'
import CommentBox from './CommentBox'

const BoardDetailForm = () => {
  const params = useParams()
  const navigate = useNavigate()
  const user = useUser()

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

  const handleBoardDelete = () => {}

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
                  onClick={() => navigate(-1)}
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
