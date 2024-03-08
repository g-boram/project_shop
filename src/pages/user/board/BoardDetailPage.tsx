import BoardDetailForm from '@/components/board/BoardDetailForm'
import HeadTitle from '@/components/shared/HeadTitle'
import styled from '@emotion/styled'

const BoardDetailPage = () => {
  return (
    <>
      <HeadTitle title="게시판" desc="게시판 상세 보기" />
      <CategoryContainer>
        <CategoryWrapper>
          <BoardDetailForm />
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

export default BoardDetailPage
