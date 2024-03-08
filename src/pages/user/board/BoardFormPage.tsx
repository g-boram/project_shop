import BoardForm from '@/components/board/BoardForm'
import HeadTitle from '@/components/shared/HeadTitle'
import styled from '@emotion/styled'

// * 게시판 - 글작성 페이지
////////////////////////////////////////
function BoardFormPage() {
  return (
    <>
      <HeadTitle title="게시판" desc="게시글 작성/수정" />
      <BoardFormContainer>
        <BoardFormWrapper>
          <BoardForm />
        </BoardFormWrapper>
      </BoardFormContainer>
    </>
  )
}

const BoardFormContainer = styled.div`
  margin: 0 auto;
  margin-top: 40px;
`
const BoardFormWrapper = styled.div`
  @media (max-width: 600px) {
    padding: 0 20px;
  }
  @media (min-width: 600px) {
    padding: 0 100px;
  }
`
export default BoardFormPage
