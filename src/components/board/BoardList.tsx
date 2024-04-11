import { getBoardList } from '@/remote/board'
import { css } from '@emotion/react'
import { useEffect, useState } from 'react'
import { useQuery } from 'react-query'
import Flex from '../shared/Flex'
import Pagination from '../shared/Pagination'
import Text from '../shared/Text'
import styled from '@emotion/styled'
import { Link } from 'react-router-dom'
import Button from '../shared/Button'
import Spacing from '../shared/Spacing'
import useUser from '@/hooks/auth/useUser'
import { BoardFormProps } from '@/models/board'
import { FcDeleteDatabase } from 'react-icons/fc'

const BoardList = () => {
  const user = useUser()
  const [category, setCategory] = useState<string>('info')
  const [myBoard, setMyboard] = useState<BoardFormProps[]>([])
  const [isMyBoard, setIsMyboard] = useState(false)

  const { data, isLoading } = useQuery('boardList', getBoardList, {
    select: (data) => {
      const setData = data.filter((v) => v.category === category)
      return setData
    },
  })

  const [page, setPage] = useState(1)
  const offset = (page - 1) * 10
  const [innerWidth, setInnerWidth] = useState(0)

  const changeMyBoard = () => {
    const filtering = data?.filter((v) => v.uid === user?.uid)
    if (filtering) {
      setMyboard(filtering)
    }
    setIsMyboard(true)
  }

  const handleResize = () => {
    setInnerWidth(window.innerWidth)
  }

  useEffect(() => {
    if (innerWidth === 0) {
      window.addEventListener('resize', handleResize)

      setInnerWidth(window.innerWidth)
      window.removeEventListener('resize', handleResize)
    }
    window.addEventListener('resize', handleResize)
    return () => {
      window.removeEventListener('resize', handleResize)
    }
  }, [])

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

  const NoDataBox = () => {
    return (
      <NoData>
        <FcDeleteDatabase size={40} />
        <Flex>작성된 글이 없습니다</Flex>
        <Flex>지금 바로 게시물을 작성해 보세요!</Flex>
      </NoData>
    )
  }
  return (
    <>
      <Flex justify={'flex-end'} align={'flex-end'} css={linkBtnBoxStyle}>
        <Link to={'/board/category'}>
          <Button color="pink" size="medium" onClick={changeMyBoard}>
            내가쓴글
          </Button>
        </Link>
        <Link to={'/board/form'}>
          <Button color="pink" size="medium">
            글쓰기
          </Button>
        </Link>
      </Flex>
      <Flex justify={'flex-start'} align={'center'}>
        <CategoryBtn
          cate="info"
          onClick={() => {
            setCategory('info')
            setIsMyboard(false)
          }}
        >
          Info
        </CategoryBtn>
        <CategoryBtn
          cate="qna"
          onClick={() => {
            setCategory('qna')
            setIsMyboard(false)
          }}
        >
          QnA
        </CategoryBtn>
        <CategoryBtn
          cate="event"
          onClick={() => {
            setCategory('event')
            setIsMyboard(false)
          }}
        >
          Event
        </CategoryBtn>
      </Flex>
      <Spacing size={10} />
      <LabelLine />
      <BoardListContainer>
        {innerWidth < 500 ? (
          <>
            {isMyBoard ? (
              <>
                {myBoard.length === 0 ? (
                  <NoDataBox />
                ) : (
                  <>
                    {myBoard?.map((data, idx) => (
                      <Link to={`/board/detail/${data.id}`}>
                        <Flex
                          key={idx}
                          justify={'space-between'}
                          align={'center'}
                          css={css`
                            width: 100%;
                            height: 45px;
                            &: hover {
                              background-color: #fff5f5;
                              cursor: pointer;
                            }
                          `}
                        >
                          <Text
                            typography="t6"
                            color="fontGrey"
                            css={css`
                              width: 10%;
                              overflow: hidden;
                              text-wrap: nowrap;
                              text-align: center;
                            `}
                          >
                            {idx + 1}
                          </Text>
                          <Text
                            typography="t6"
                            color="fontDarkGrey"
                            css={css`
                              width: 70%;
                              overflow: hidden;
                              text-wrap: nowrap;
                            `}
                          >
                            {data.title}
                          </Text>
                          <Text
                            typography="t7"
                            color="fontDarkGrey"
                            css={css`
                              width: 15%;
                              overflow: hidden;
                              text-wrap: nowrap;
                            `}
                          >
                            {data.name}
                          </Text>
                        </Flex>
                      </Link>
                    ))}
                  </>
                )}
              </>
            ) : (
              <>
                {data ? (
                  <>
                    {data?.slice(offset, offset + 10).map((data, idx) => (
                      <Link to={`/board/detail/${data.id}`}>
                        <Flex
                          key={idx}
                          justify={'space-between'}
                          align={'center'}
                          css={css`
                            width: 100%;
                            height: 45px;
                            &: hover {
                              background-color: #fff5f5;
                              cursor: pointer;
                            }
                          `}
                        >
                          <Text
                            typography="t6"
                            color="fontGrey"
                            css={css`
                              width: 10%;
                              overflow: hidden;
                              text-wrap: nowrap;
                              text-align: center;
                            `}
                          >
                            {idx + 1}
                          </Text>
                          <Text
                            typography="t6"
                            color="fontDarkGrey"
                            css={css`
                              width: 70%;
                              overflow: hidden;
                              text-wrap: nowrap;
                            `}
                          >
                            {data.title}
                          </Text>
                          <Text
                            typography="t7"
                            color="fontDarkGrey"
                            css={css`
                              width: 15%;
                              overflow: hidden;
                              text-wrap: nowrap;
                            `}
                          >
                            {data.name}
                          </Text>
                        </Flex>
                      </Link>
                    ))}
                  </>
                ) : (
                  <NoDataBox />
                )}
              </>
            )}
          </>
        ) : (
          <>
            {isMyBoard ? (
              <>
                {myBoard ? (
                  <>
                    {myBoard?.map((data, idx) => (
                      <Link to={`/board/detail/${data.id}`}>
                        <Flex
                          justify={'space-between'}
                          align={'center'}
                          key={idx}
                          css={css`
                            width: 100%;
                            height: 45px;
                            &: hover {
                              background-color: #fff5f5;
                              cursor: pointer;
                            }
                          `}
                        >
                          <Text
                            typography="t6"
                            color="fontGrey"
                            css={css`
                              width: 10%;
                              overflow: hidden;
                              text-align: center;
                              text-wrap: nowrap;
                            `}
                          >
                            {idx + 1}
                          </Text>
                          <Text
                            typography="t6"
                            color="fontDarkGrey"
                            css={css`
                              width: 50%;
                              overflow: hidden;
                              text-wrap: nowrap;
                            `}
                          >
                            {data.title}
                          </Text>
                          <Text
                            typography="t6"
                            color="fontDarkGrey"
                            css={css`
                              width: 25%;
                              overflow: hidden;
                              text-wrap: nowrap;
                            `}
                          >
                            {data.content}
                          </Text>
                          <Text
                            typography="t7"
                            color="fontDarkGrey"
                            css={css`
                              width: 8%;
                              overflow: hidden;
                              text-wrap: nowrap;
                            `}
                          >
                            {data.name}
                          </Text>
                          <Text
                            typography="t7"
                            color="fontGrey"
                            css={css`
                              width: 10%;
                              overflow: hidden;
                              text-wrap: nowrap;
                            `}
                          >
                            {data?.createAt?.slice(0, 10)}
                          </Text>
                        </Flex>
                      </Link>
                    ))}
                  </>
                ) : (
                  <NoDataBox />
                )}
              </>
            ) : (
              <>
                {data ? (
                  <>
                    {data?.slice(offset, offset + 10).map((data, idx) => (
                      <Link to={`/board/detail/${data.id}`}>
                        <Flex
                          justify={'space-between'}
                          align={'center'}
                          key={idx}
                          css={css`
                            width: 100%;
                            height: 45px;
                            &: hover {
                              background-color: #fff5f5;
                              cursor: pointer;
                            }
                          `}
                        >
                          <Text
                            typography="t6"
                            color="fontGrey"
                            css={css`
                              width: 10%;
                              overflow: hidden;
                              text-align: center;
                              text-wrap: nowrap;
                            `}
                          >
                            {idx + 1}
                          </Text>
                          <Text
                            typography="t6"
                            color="fontDarkGrey"
                            css={css`
                              width: 50%;
                              overflow: hidden;
                              text-wrap: nowrap;
                            `}
                          >
                            {data.title}
                          </Text>
                          <Text
                            typography="t6"
                            color="fontDarkGrey"
                            css={css`
                              width: 25%;
                              overflow: hidden;
                              text-wrap: nowrap;
                            `}
                          >
                            {data.content}
                          </Text>
                          <Text
                            typography="t7"
                            color="fontDarkGrey"
                            css={css`
                              width: 8%;
                              overflow: hidden;
                              text-wrap: nowrap;
                            `}
                          >
                            {data.name}
                          </Text>
                          <Text
                            typography="t7"
                            color="fontGrey"
                            css={css`
                              width: 10%;
                              overflow: hidden;
                              text-wrap: nowrap;
                            `}
                          >
                            {data?.createAt?.slice(0, 10)}
                          </Text>
                        </Flex>
                      </Link>
                    ))}
                  </>
                ) : (
                  <NoDataBox />
                )}
              </>
            )}
          </>
        )}
      </BoardListContainer>
      {isMyBoard ? null : (
        <>
          {data ? (
            <Pagination
              total={data?.length}
              limit={10}
              page={page}
              setPage={setPage}
            />
          ) : null}
        </>
      )}
    </>
  )
}

const BoardListContainer = styled.div`
  width: 100%;
  height: 500px;
  margin-bottom: 30px;
  border: 1px solid #eee;
  border-radius: 5px;
  overflow: scroll;
`

const NoData = styled.div`
  height: 460px;
  display: flex;
  gap: 10px;
  font-size: 14px;
  color: grey;
  align-items: center;
  justify-content: center;
  flex-direction: column;
  background-color: #f9ecec;
`

const LabelLine = styled.div`
  width: 100%;
  height: 20px;
  display: flex;
  justify-content: space-between;
  align-items: center;
  border-radius: 5px;
  margin-bottom: 10px;
  background-color: #eee;
`

const linkBtnBoxStyle = css`
  height: 60px;
  margin-bottom: 20px;
  margin-top: 20px;
  gap: 5px;
`

export default BoardList
