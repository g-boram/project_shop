import { COLLECTIONS } from '@/constants'
import { BoardCategoryOption, USER_CATEGORY } from '@/constants/board'
import useUser from '@/hooks/auth/useUser'
import { BoardFormProps } from '@/models/board'
import { upDateBoard } from '@/remote/board'
import { store } from '@/remote/firebase'
import { css } from '@emotion/react'
import styled from '@emotion/styled'
import { doc, getDoc } from 'firebase/firestore'
import React, { useEffect, useState } from 'react'
import { Link, useNavigate, useParams } from 'react-router-dom'
import CreatableSelect from 'react-select/creatable'
import { toast } from 'react-toastify'
import Button from '../shared/Button'
import Flex from '../shared/Flex'
import Spacing from '../shared/Spacing'
import Text from '../shared/Text'

const ManagerBoardEditForm = () => {
  const user = useUser()
  const params = useParams()
  const navigate = useNavigate()

  const [board, setBoard] = useState<BoardFormProps | null>(null)

  const getDetailBoard = async (id: string) => {
    const docRef = doc(store, `${COLLECTIONS.BOARD}`, id)
    const docSnap = await getDoc(docRef)

    setBoard({ id: docSnap.id, ...(docSnap.data() as BoardFormProps) })
  }

  useEffect(() => {
    if (params?.id) getDetailBoard(params?.id)
  }, [params?.id])

  useEffect(() => {
    if (board) {
      setFormValues(board)
    }
  }, [board])

  const [category, setCategory] = useState<BoardCategoryOption | null>()
  const [formValues, setFormValues] = useState<BoardFormProps>({
    title: '',
    content: '',
    category: '',
    uid: '',
    email: '',
    name: '',
  })

  const handleFormValues = (
    e: React.ChangeEvent<HTMLTextAreaElement | HTMLInputElement>,
  ) => {
    setFormValues((prevFormValues) => ({
      ...prevFormValues,
      [e.target.name]: e.target.value,
    }))
  }

  const handleSubmit = async (e: any) => {
    e.preventDefault()
    const formData = {
      ...formValues,
      uid: user?.uid,
      email: user?.email,
      name: user?.displayName,
      category: category ? category.value : board?.category,
      updateAt: new Date()?.toLocaleDateString('ko', {
        hour: '2-digit',
        minute: '2-digit',
        second: '2-digit',
      }),
    }
    try {
      if (board && board.id) {
        await upDateBoard(formData, board?.id)
        toast.success('게시글 수정 완료!')
        navigate(`/board/detail/${board.id}`)
      }
    } catch (e: any) {
      console.log('error', e)
    }
  }

  const changeValue = (val: any) => {
    if (val === 'info') return '정보공유'
    if (val === 'qna') return 'QnA'
    if (val === 'event') return '이벤트'
    if (val === 'notice') return '공지사항'
  }

  return (
    <>
      <NoticeBox>
        <Flex
          align={'center'}
          css={css`
            height: 100%;
          `}
        ></Flex>
      </NoticeBox>
      <Flex
        justify={'flex-end'}
        align={'flex-end'}
        direction={'column'}
        css={formTitleStyle}
      >
        <Text typography="t4">게시글 수정</Text>
        <Text typography="t7" color="fontDarkGrey">
          서로를 존중하는 말로 좋은 게시글 문화를 만들어가요
        </Text>
      </Flex>

      <FormContainer>
        <Flex direction="column">
          <Spacing size={10} />
          <Flex align={'center'}>
            <Label>카테고리</Label>
            <>
              <CreatableSelect
                placeholder={
                  board
                    ? changeValue(board.category)
                    : '카테고리를 선택해주세요'
                }
                onChange={(newValue) => setCategory(newValue)}
                options={USER_CATEGORY}
                value={category}
                styles={{
                  container: (containerStyles) => ({
                    ...containerStyles,
                    width: '100%',
                    fontSize: '13px',
                    border: '1px solid #f4aeba',
                    borderRadius: '5px',
                  }),
                  control: (controlStyles) => ({
                    ...controlStyles,
                    border: '1px solid #e2e2e2',
                  }),
                  menu: (controlStyles) => ({
                    ...controlStyles,
                    height: '150px',
                    overflow: 'scroll',
                  }),
                }}
              />
            </>
          </Flex>
          <Spacing size={10} />
          <Flex>
            <Label>제목</Label>
            <InputBox>
              <input
                name="title"
                id="title"
                onChange={handleFormValues}
                value={formValues.title}
              />
            </InputBox>
          </Flex>
          <Spacing size={10} />
          <Flex>
            <Label>내용</Label>
            <TextareaBox>
              <textarea
                name="content"
                id="content"
                onChange={handleFormValues}
                value={formValues.content}
              />
            </TextareaBox>
          </Flex>
        </Flex>
        <Spacing size={20} />
        <Flex justify={'center'}>
          <Button color="pink" full onClick={handleSubmit}>
            게시글 등록
          </Button>
        </Flex>
        <Spacing size={20} />
      </FormContainer>
      <Spacing size={20} />
      <Flex justify={'center'}>
        <Link to={'/board/category'}>
          <Button size="medium" color="lightPurple">
            목록
          </Button>
        </Link>
      </Flex>
    </>
  )
}
const formTitleStyle = css`
  height: 100px;
  border-bottom: 5px solid pink;
  padding-bottom: 10px;
  margin-bottom: 20px;
`

const FormContainer = styled.div`
  height: auto;
  padding: 10px;
  border: 2px solid #eee;
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
const TextareaBox = styled.div`
  height: auto;
  width: 100%;
  display: flex;
  align-items: center;
  justify-content: center;

  & textarea {
    border: 1px solid #f4aeba;
    width: 100%;
    padding: 10px 10px;
    border-radius: 5px;
    height: 300px;
  }
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
const NoticeBox = styled.div`
  background-color: white;
  padding: 0 10px;
  border: 2px solid #f9ecec;
  box-shadow: 0px 0px 10px -2px #ffbdd2;
  height: 60px;
  border-radius: 8px;
  margin-bottom: 20px;
`
export default ManagerBoardEditForm
