import useUser from '@/hooks/auth/useUser'
import { BoardFormProps } from '@/models/board'
import { addBoard } from '@/remote/board'
import styled from '@emotion/styled'
import React, { useState } from 'react'
import { toast } from 'react-toastify'
import Button from '../shared/Button'
import Flex from '../shared/Flex'
import Spacing from '../shared/Spacing'

// 카테고리: chat(실시간), qna, info, notice
const BoardForm = () => {
  const user = useUser()
  const [formValues, setFormValues] = useState<BoardFormProps>({
    title: '',
    content: '',
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
      category: 'info',
    }
    try {
      await addBoard(formData)

      setFormValues({
        title: '',
        content: '',
      })
      toast.success('게시글 등록 완료!')
    } catch (e: any) {
      console.log('error', e)
    }
  }

  return (
    <FormContainer>
      <Flex direction="column">
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
        <Button onClick={handleSubmit}>게시글 등록</Button>
      </Flex>
    </FormContainer>
  )
}
const FormContainer = styled.div`
  height: auto;
  padding: 10px;
  background-color: green;
`

const Label = styled.div`
  min-width: 20%;
  height: 40px;
  display: flex;
  align-items: center;
  justify-content: flex-start;
  font-size: 14px;
  background-color: pink;
`
const TextareaBox = styled.div`
  height: auto;
  width: 100%;
  padding: 5px 0;
  background-color: grey;
  display: flex;
  align-items: center;
  justify-content: center;

  & textarea {
    border: none;
    width: 85%;
    padding: 10px 10px;
    border-radius: 5px;
    height: 200px;
  }
`
const InputBox = styled.div`
  height: 40px;
  width: 100%;
  padding: 5px 0;
  background-color: grey;
  display: flex;
  align-items: center;
  justify-content: center;

  & input {
    border: none;
    width: 85%;
    padding: 0px 10px;
    border-radius: 5px;
    height: 38px;
  }
`
export default BoardForm
