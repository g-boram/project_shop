import { BoardCategoryOption, MANAGER_CATEGORY } from '@/constants/board'
import { toast } from 'react-toastify'
import { BoardFormProps } from '@/models/board'
import { addBoard } from '@/remote/board'
import { css } from '@emotion/react'
import { Link, useNavigate } from 'react-router-dom'
import React, { useState } from 'react'
import styled from '@emotion/styled'
import useUser from '@/hooks/auth/useUser'
import CreatableSelect from 'react-select/creatable'
import Button from '../shared/Button'
import Flex from '../shared/Flex'
import ManagerPageLayout from '../shared/Layout/ManagerPageLayout'
import ManagerHead from '../shared/ManagerHead'
import Spacing from '../shared/Spacing'
import Text from '../shared/Text'

const ManagerBoardForm = () => {
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
      navigate('/manager/data/setBoardData')
    } catch (e: any) {
      console.log('error', e)
    }
  }

  return (
    <ManagerPageLayout>
      <ManagerHead title={'Set Board Data'} />
      <SettingContainer>
        <Flex
          justify={'flex-end'}
          align={'flex-end'}
          direction={'column'}
          css={formTitleStyle}
        >
          <Text typography="t4">게시글 작성</Text>
          <Text typography="t7" color="fontDarkGrey">
            정해진 양식/확정 된 내용으로 등록해주세요
          </Text>
        </Flex>
        <FormContainer>
          <Flex direction="column">
            <Spacing size={10} />
            <Flex align={'center'}>
              <Label>카테고리</Label>
              <>
                <CreatableSelect
                  placeholder="카테고리를 선택해 주세요"
                  onChange={(newValue) => setCategory(newValue)}
                  options={MANAGER_CATEGORY}
                  value={category}
                  styles={{
                    container: (containerStyles) => ({
                      ...containerStyles,
                      width: '100%',
                      fontSize: '13px',
                      border: '1px solid #cdcdff',
                      borderRadius: '5px',
                    }),
                    control: (controlStyles) => ({
                      ...controlStyles,
                      border: '1px solid #cdcdff',
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
            <Button color="lightPurple" full onClick={handleSubmit}>
              게시글 등록
            </Button>
          </Flex>
          <Spacing size={20} />
        </FormContainer>
        <Spacing size={20} />
        <Flex justify={'center'}>
          <Link to={'/manager/data/setBoardData'}>
            <Button size="medium" color="purple">
              목록
            </Button>
          </Link>
        </Flex>
      </SettingContainer>
    </ManagerPageLayout>
  )
}

const SettingContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: flex-start;
  height: 800px;
  width: 100%;
`
const formTitleStyle = css`
  height: 100px;
  border-bottom: 5px solid #b4b4ff;
  padding-bottom: 10px;
  margin-bottom: 20px;
  width: 1000px;
`

const FormContainer = styled.div`
  height: auto;
  width: 1000px;
  padding: 10px;
  border: 2px solid #ededff;
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
  background-color: #6643b5;
`
const TextareaBox = styled.div`
  height: auto;
  width: 100%;
  display: flex;
  align-items: center;
  justify-content: center;

  & textarea {
    border: 1px solid #cdcdff;
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
    border: 1px solid #cdcdff;
    width: 100%;
    padding: 0px 10px;
    border-radius: 5px;
    height: 40px;
  }
`
export default ManagerBoardForm
