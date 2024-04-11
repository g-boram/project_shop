import { BoardCategoryOption, USER_CATEGORY } from '@/constants/board'
import useUser from '@/hooks/auth/useUser'
import { BoardFormProps } from '@/models/board'
import { addBoard } from '@/remote/board'
import { css } from '@emotion/react'
import styled from '@emotion/styled'
import React, { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import CreatableSelect from 'react-select/creatable'
import { toast } from 'react-toastify'
import Button from '../shared/Button'
import Flex from '../shared/Flex'
import Spacing from '../shared/Spacing'
import Text from '../shared/Text'

// 카테고리: chat(실시간), qna, info, notice
const BoardForm = () => {
  const user = useUser()
  const navigate = useNavigate()
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
      category: category ? category.value : 'info',
    }
    try {
      await addBoard(formData)

      setFormValues({
        title: '',
        content: '',
        category: '',
        uid: '',
        email: '',
        name: '',
      })
      toast.success('게시글 등록 완료!')
      navigate('/board/category')
    } catch (e: any) {
      console.log('error', e)
    }
  }

  return (
    <>
      <Flex
        justify={'flex-end'}
        align={'flex-end'}
        direction={'column'}
        css={formTitleStyle}
      >
        <Text typography="t4" bold>
          게시글 작성
        </Text>
        <Spacing size={20} />
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
                placeholder="미선택시 정보공유 게시판에 등록됩니다"
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
                    border: 'none',
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
          <Button color="pink" size="medium" full onClick={handleSubmit}>
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
      <Spacing size={50} />
    </>
  )
}
const formTitleStyle = css`
  height: 100px;
  border-bottom: 4px solid #eee;
  padding-bottom: 10px;
  margin-bottom: 20px;
`

const FormContainer = styled.div`
  height: auto;
  padding: 10px;
  border: 1px solid #eee;
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
export default BoardForm
