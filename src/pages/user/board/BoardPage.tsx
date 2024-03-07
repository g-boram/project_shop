import { getBoardList } from '@/remote/board'
import { css } from '@emotion/react'
import { useState } from 'react'
import { useQuery } from 'react-query'
import { Link } from 'react-router-dom'
import { IoNotificationsCircle } from 'react-icons/io5'
import { FaArrowRightLong } from 'react-icons/fa6'
import BoardMove from '@/components/board'
import Button from '@/components/shared/Button'
import Flex from '@/components/shared/Flex'
import HeadTitle from '@/components/shared/HeadTitle'
import styled from '@emotion/styled'
import Text from '@/components/shared/Text'
import Spacing from '@/components/shared/Spacing'
import ChatingBox from '@/components/board/ChatingBox'

// 카테고리: chat(실시간), qna, info, notice, event

// * 게시판 메인페이지
////////////////////////////////////////
function BoardPage() {
  const [category, setCategory] = useState<string>('info')

  const { data: notice, isLoading } = useQuery('boardListOther', getBoardList, {
    select: (data) => {
      const result = data.filter((v) => v.category === 'notice')
      return result[0]
    },
  })

  const CategoryBtn = styled.div<{ cate: string }>`
    width: 80px;
    height: 20px;
    font-weight: bold;
    margin-right: 5px;
    text-align: center;
    font-size: 18px;
    cursor: pointer;
    color: ${(props) => (props.cate === category ? '#f4aeba;' : 'grey')};

    &: hover {
      transition: 0.5s;
      color: pink;
    }
  `
  return (
    <BoardContainer>
      <BoardWrapper>
        <HeadTitle title="게시판" desc="함께 소통해요 우리들의 게시판" />
        <Flex css={layoutStyle}>
          <ChatingContainer>
            <EventImgBox>
              <img
                src="https://cdn.pixabay.com/photo/2020/04/02/05/19/beauty-4993472_1280.jpg"
                alt="boardImg"
              />
            </EventImgBox>
            <ChatingBox />
          </ChatingContainer>
          <BoardListContainer>
            <NoticeBox>
              <Flex
                align={'center'}
                css={css`
                  height: 100%;
                `}
              >
                <IoNotificationsCircle size={30} fill={'#f4aeba'} />
                <Spacing size={10} direction={'horizontal'} />
                {notice ? (
                  <Text typography="t6" color="fontDarkGrey">
                    {notice.content}
                  </Text>
                ) : (
                  <Text typography="t7">안내사항이 없습니다</Text>
                )}
              </Flex>
            </NoticeBox>
            <Flex justify={'flex-end'} align={'flex-end'} css={linkBtnBoxStyle}>
              <Link to={'/board/category'}>
                <Button color="pink" size="small">
                  내가쓴글
                </Button>
              </Link>
              <Link to={'/board/category'}>
                <Button color="pink" size="small">
                  글쓰기
                </Button>
              </Link>
            </Flex>
            <CategoryBox>
              <Flex justify={'space-between'} align={'center'}>
                <Flex>
                  <CategoryBtn cate="info" onClick={() => setCategory('info')}>
                    Info
                  </CategoryBtn>
                  <CategoryBtn cate="qna" onClick={() => setCategory('qna')}>
                    QnA
                  </CategoryBtn>
                  <CategoryBtn
                    cate="event"
                    onClick={() => setCategory('event')}
                  >
                    Event
                  </CategoryBtn>
                </Flex>
                <Link to={'/board/category'}>
                  <Flex css={moreBtn} align={'center'}>
                    더보기
                    <FaArrowRightLong size={10} />
                  </Flex>
                </Link>
              </Flex>
            </CategoryBox>
            <BoardListBox>
              <BoardMove category={category} />
            </BoardListBox>
          </BoardListContainer>
        </Flex>
      </BoardWrapper>
    </BoardContainer>
  )
}

const CategoryBox = styled.div`
  background-color: white;
  margin-top: 40px;
  height: 25px;
  border-bottom: 2px solid #f9ecec;
`

const BoardContainer = styled.div`
  height: 100vh;
`
const BoardWrapper = styled.div`
  height: 100%;
  overflow: scroll;
`
const ChatingContainer = styled.div`
  padding: 10px;
  flex-grow: 0;
  @media (min-width: 800px) {
    width: 350px;
    height: 630px;
  }
  @media (max-width: 800px) {
    height: 350px;
    margin-bottom: 70px;
  }
`
const BoardListContainer = styled.div`
  display: flex;
  flex-direction: column;
  padding: 10px 20px;
  flex-grow: 1;
`

const BoardListBox = styled.div`
  background-color: white;
  margin-top: 10px;
`

const NoticeBox = styled.div`
  background-color: white;
  padding: 0 10px;
  border: 2px solid #f9ecec;
  box-shadow: 0px 0px 10px -2px #ffbdd2;
  height: 60px;
  border-radius: 8px;
`

const EventImgBox = styled.div`
  background-color: white;
  height: 80px;
  width: 100%;

  & > img {
    height: 80px;
    width: 100%;
    object-fit: cover;
    border-radius: 5px;
  }
`
const moreBtn = css`
  width: 80px;
  gap: 10px;
  font-size: 12px;
  color: grey;
  cursor: pointer;
`
const linkBtnBoxStyle = css`
  height: 60px;
  gap: 5px;
`

const layoutStyle = css`
  @media (max-width: 800px) {
    gap: 10px;
    flex-direction: column;
  }
  @media (min-width: 600px) {
    gap: 10px;
  }
`
export default BoardPage
