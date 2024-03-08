import { getBoardList } from '@/remote/board'
import { css } from '@emotion/react'
import { useEffect, useState } from 'react'
import { useQuery } from 'react-query'
import Flex from '../shared/Flex'
import Pagination from '../shared/Pagination'
import Text from '../shared/Text'
import styled from '@emotion/styled'
import { Link } from 'react-router-dom'

const BoardMove = ({ category }: any) => {
  const { data, isLoading } = useQuery('boardList', getBoardList, {
    select: (data) => {
      const setData = data.filter((v) => v.category === category)
      return setData
    },
  })

  const [page, setPage] = useState(1)
  const offset = (page - 1) * 10

  const [innerWidth, setInnerWidth] = useState(0)
  const handleResize = () => {
    setInnerWidth(window.innerWidth)
  }
  useEffect(() => {
    window.addEventListener('resize', handleResize)
    return () => {
      window.removeEventListener('resize', handleResize)
    }
  }, [])

  return (
    <>
      <BoardListContainer>
        <LabelLine>
          <div
            css={css`
              width: 5%;
            `}
          />
          <Text
            typography="t8"
            bold
            color="fontDarkGrey"
            css={css`
              width: 50%;
            `}
          >
            제목
          </Text>
          {innerWidth < 500 ? null : (
            <>
              <Text
                typography="t8"
                color="fontDarkGrey"
                css={css`
                  width: 25%;
                `}
              >
                내용
              </Text>
              <Text
                typography="t8"
                color="fontDarkGrey"
                css={css`
                  width: 8%;
                `}
              >
                작성자
              </Text>
              <Text
                typography="t8"
                color="fontGrey"
                css={css`
                  width: 10%;
                `}
              >
                작성일
              </Text>
            </>
          )}
        </LabelLine>
        {innerWidth < 500 ? (
          <Link to={'/board/category'}>
            <>
              {data?.slice(offset, offset + 10).map((data, idx) => (
                <Flex
                  key={idx}
                  justify={'space-between'}
                  align={'center'}
                  css={css`
                    width: 100%;
                    height: 40px;
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
              ))}
            </>
          </Link>
        ) : (
          <Link to={'/board/category'}>
            <>
              {data?.slice(offset, offset + 10).map((data, idx) => (
                <Flex
                  justify={'space-between'}
                  align={'center'}
                  key={idx}
                  css={css`
                    width: 100%;
                    height: 40px;
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
              ))}
            </>
          </Link>
        )}
      </BoardListContainer>
    </>
  )
}
const BoardListContainer = styled.div`
  width: 100%;
  height: 440px;
  margin-bottom: 20px;
  border: 1px solid #eee;
  border-radius: 5px;
`

const LabelLine = styled.div`
  width: 100%;
  height: 30px;
  display: flex;
  justify-content: space-between;
  align-items: center;
  border-radius: 5px;
  background-color: #f9ecec;
`
export default BoardMove
