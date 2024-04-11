import useUser from '@/hooks/auth/useUser'
import styled from '@emotion/styled'
import Button from '../shared/Button'
import Flex from '../shared/Flex'
import Spacing from '../shared/Spacing'
import Text from '../shared/Text'

import { COLLECTIONS } from '@/constants'
import { useAlertContext } from '@/contexts/AlertContext'
import { BoardFormProps } from '@/models/board'
import { store } from '@/remote/firebase'
import { css } from '@emotion/react'
import { arrayUnion, doc, updateDoc } from 'firebase/firestore'
import { ChangeEvent, useState } from 'react'
import { toast } from 'react-toastify'
import { IoIosArrowUp } from 'react-icons/io'
import { RiEmotionSadLine } from 'react-icons/ri'
import { deleteComment } from '@/remote/board'

interface CommentsProps {
  board: BoardFormProps | null
  getDetailBoard: (id: string) => Promise<void>
}

const CommentBox = ({ board, getDetailBoard }: CommentsProps) => {
  const [comment, setComment] = useState('')
  const [isMore, setIsMore] = useState<boolean>(false)
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
            isCancle: false,
            onCancleClick: () => {},
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

  const handleMore = () => {
    setIsMore((prev) => !prev)
  }
  const UserImg = styled.div<{ uid?: string }>`
    width: 38px;
    height: 38px;
    border-radius: 100%;
    border: ${(props) =>
      props.uid === user?.uid ? '2px solid #c86b85' : '2px solid #fff'};
    & img {
      width: 100%;
      height: 100%;
      object-fit: cover;
    }
  `

  const handleCommentDelete = (comment: any) => {
    if (board?.id) {
      deleteComment(board.id, comment)
      toast.success('댓글이 삭제 되었습니다!')
      getDetailBoard(board.id)
    }
  }

  const CommentArea = () => {
    return (
      <>
        {isMore ? (
          <>
            <CommentMoreList>
              {board?.comments
                ?.slice(0)
                ?.reverse()
                .map((comment) => (
                  <Flex justify={'space-between'} align={'center'}>
                    <Flex
                      justify={'flex-start'}
                      align={'center'}
                      css={commentLineStyle}
                    >
                      <UserImg uid={comment.uid}>
                        <img
                          src={
                            comment.photoURL !== ''
                              ? comment.photoURL
                              : 'https://cdn1.iconfinder.com/data/icons/user-pictures/100/girl-1024.png'
                          }
                          alt=""
                        />
                      </UserImg>
                      <Spacing size={10} direction={'horizontal'} />
                      <Flex direction="column">
                        <Text typography="t6">{comment.content}</Text>
                        <Spacing size={3} />
                        <Flex>
                          <Text typography="t8" color="fontDarkGrey">
                            {comment.displayName}
                          </Text>
                          <Spacing size={10} direction={'horizontal'} />
                          <Text typography="t8" color="fontGrey">
                            {comment.createAt}
                          </Text>
                        </Flex>
                      </Flex>
                    </Flex>
                    {user?.uid === comment.uid ? (
                      <DelBtn
                        onClick={() =>
                          open({
                            title: '해당 댓글을 삭제 하시겠습니까?',
                            description: '삭제시 복구가 되지않습니다.',
                            onCancleClick: () => {},
                            onButtonClick: () => {
                              handleCommentDelete(comment)
                            },
                          })
                        }
                      >
                        삭제
                      </DelBtn>
                    ) : null}
                  </Flex>
                ))}
            </CommentMoreList>
            <Button full color="pink" onClick={handleMore}>
              <IoIosArrowUp size={15} />
            </Button>
          </>
        ) : (
          <>
            <CommentList>
              {board?.comments
                ?.slice(-5)
                ?.reverse()
                .map((comment) => (
                  <Flex justify={'space-between'} align={'center'}>
                    <Flex
                      justify={'flex-start'}
                      align={'center'}
                      css={commentLineStyle}
                    >
                      <UserImg uid={comment.uid}>
                        <img
                          src={
                            comment.photoURL !== ''
                              ? comment.photoURL
                              : 'https://cdn1.iconfinder.com/data/icons/user-pictures/100/girl-1024.png'
                          }
                          alt=""
                        />
                      </UserImg>
                      <Spacing size={10} direction={'horizontal'} />
                      <Flex direction="column">
                        <Text typography="t6">{comment.content}</Text>
                        <Spacing size={3} />
                        <Flex>
                          <Text typography="t8" color="fontDarkGrey">
                            {comment.displayName}
                          </Text>
                          <Spacing size={10} direction={'horizontal'} />
                          <Text typography="t8" color="fontGrey">
                            {comment.createAt}
                          </Text>
                        </Flex>
                      </Flex>
                    </Flex>
                    {user?.uid === comment.uid ? (
                      <DelBtn
                        onClick={() =>
                          open({
                            title: '해당 댓글을 삭제 하시겠습니까?',
                            description: '삭제시 복구가 되지않습니다.',
                            onCancleClick: () => {},
                            onButtonClick: () => {
                              handleCommentDelete(comment)
                            },
                          })
                        }
                      >
                        삭제
                      </DelBtn>
                    ) : null}
                  </Flex>
                ))}
            </CommentList>
            <Button full color="pink" onClick={handleMore}>
              댓글 더보기
            </Button>
          </>
        )}
      </>
    )
  }
  return (
    <CommentContainer>
      <CommentHead>
        <Text typography="t6" color="black">
          댓글 {board?.comments ? board?.comments.length : 0} 개
        </Text>
      </CommentHead>
      {board?.comments ? (
        <CommentArea />
      ) : (
        <NotComment>
          <Spacing size={30} />
          <Flex direction="column" justify={'center'} align={'center'}>
            <RiEmotionSadLine size={20} color={'grey'} />
            <Spacing size={10} direction={'horizontal'} />
            <Text typography="t7" color="fontGrey">
              아직 댓글이 없어요
            </Text>
          </Flex>
        </NotComment>
      )}
      <CommentForm>
        <Flex justify={'space-between'} align={'center'}>
          <UserImg>
            <img
              src={
                user?.photoURL !== ''
                  ? user?.photoURL
                  : 'https://cdn1.iconfinder.com/data/icons/user-pictures/100/girl-1024.png'
              }
              alt=""
            />
          </UserImg>
          <InputBox>
            <input type="text" value={comment} onChange={setCommentValue} />
          </InputBox>

          <Button size={'medium'} color="pink" onClick={onSubmitComment}>
            입력
          </Button>
        </Flex>
      </CommentForm>
    </CommentContainer>
  )
}

const commentLineStyle = css`
  margin: 10px 0px;
`
const CommentHead = styled.div`
  height: 30px;
  border-bottom: 1px solid #eee;
  padding: 0px 20px;
`
const CommentMoreList = styled.div`
  height: 500px;
  background-color: #fff7f9;
  padding: 10px 20px;
  overflow: scroll;
`
const CommentList = styled.div`
  height: 300px;
  background-color: #fff7f9;
  padding: 10px 20px;
`
const NotComment = styled.div`
  height: 100px;
  background-color: #fff7f9;
  padding: 10px 20px;
`

const CommentForm = styled.div`
  height: 30px;
  background-color: white;
  margin-top: 15px;
  padding: 10px;
`

const CommentContainer = styled.div`
  min-height: 500px;
  padding: 20px 0px;
`

const DelBtn = styled.div`
  font-size: 13px;
  cursor: pointer;
  color: grey;
  &: hover {
    color: red;
  }
`
const InputBox = styled.div`
  height: 30px;
  width: 73%;
  display: flex;
  align-items: center;
  justify-content: center;

  @media (max-width: 600px) {
    width: 60%;
  }
  & input {
    border: 1px solid #f4aeba;
    width: 100%;
    padding: 0px 10px;
    border-radius: 5px;
    height: 30px;
  }
`
export default CommentBox
