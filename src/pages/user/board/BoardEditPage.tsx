import BoardEditForm from '@/components/board/BoardEditForm'
import Flex from '@/components/shared/Flex'
import HeadTitle from '@/components/shared/HeadTitle'
import { css } from '@emotion/react'
import styled from '@emotion/styled'

const BoardEditPage = () => {
  return (
    <>
      <HeadTitle title="게시판" desc="게시판 수정하기" />
      <CategoryContainer>
        <CategoryWrapper>
          <BoardEditForm />
        </CategoryWrapper>
      </CategoryContainer>
    </>
  )
}
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

export default BoardEditPage
