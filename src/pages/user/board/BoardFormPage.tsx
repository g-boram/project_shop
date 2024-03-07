import BoardForm from '@/components/board/BoardForm'
import HeadTitle from '@/components/shared/HeadTitle'

// * 게시판 - 글작성 페이지
////////////////////////////////////////
function BoardFormPage() {
  return (
    <div>
      <HeadTitle title="게시판" desc="게시글 " />
      글쓰기/수정
      <BoardForm />
    </div>
  )
}

export default BoardFormPage
