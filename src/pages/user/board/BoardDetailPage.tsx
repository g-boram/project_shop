import BoardDetailForm from '@/components/board/BoardDetailForm'
import Flex from '@/components/shared/Flex'
import HeadTitle from '@/components/shared/HeadTitle'
import Modal from '@/components/shared/Modal'
import { css } from '@emotion/react'
import styled from '@emotion/styled'
import { useCallback, useState } from 'react'

const BoardDetailPage = () => {
  const [isOpenModal, setOpenModal] = useState<boolean>(false)

  const onClickToggleModal = useCallback(() => {
    setOpenModal(!isOpenModal)
  }, [isOpenModal])

  return (
    <>
      <HeadTitle title="게시판" desc="게시판 상세 보기" />
      <CategoryContainer>
        <CategoryWrapper>
          <BoardDetailForm />
        </CategoryWrapper>
      </CategoryContainer>

      <DialogButton onClick={onClickToggleModal}>Open Modal</DialogButton>
    </>
  )
}

const DialogButton = styled.button`
  width: 160px;
  height: 48px;
  background-color: blueviolet;
  color: white;
  font-size: 1.2rem;
  font-weight: 400;
  border-radius: 4px;
  border: none;
  cursor: pointer;

  &:hover {
    transform: translateY(-1px);
  }
`
const CategoryContainer = styled.div`
  margin: 0 auto;
  margin-top: 40px;
`
const CategoryWrapper = styled.div`
  @media (max-width: 600px) {
    padding: 0 20px;
  }
  @media (min-width: 600px) {
    padding: 0 100px;
  }
`

export default BoardDetailPage
