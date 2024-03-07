import BoardForm from '@/components/board/BoardForm'
import BoardList from '@/components/board/BoardList'
import Button from '@/components/shared/Button'
import Flex from '@/components/shared/Flex'
import HeadTitle from '@/components/shared/HeadTitle'
import Spacing from '@/components/shared/Spacing'
import Text from '@/components/shared/Text'
import { getBoardList } from '@/remote/board'
import { css } from '@emotion/react'
import styled from '@emotion/styled'
import { useState } from 'react'
import { IoNotificationsCircle } from 'react-icons/io5'
import { useQuery } from 'react-query'
import { Link } from 'react-router-dom'

// * 게시판 페이지 - 카테고리별 이동
////////////////////////////////////////
function BoardCategoryPage() {
  const { data: notice, isLoading } = useQuery('boardListOther', getBoardList, {
    select: (data) => {
      const result = data.filter((v) => v.category === 'notice')
      return result[0]
    },
  })

  return (
    <>
      <HeadTitle title="게시판" desc="게시판 카테고리별로 보기" />
      <CategoryContainer>
        <CategoryWrapper>
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

          <BoardList />
        </CategoryWrapper>
      </CategoryContainer>
    </>
  )
}

const CategoryContainer = styled.div`
  width: 100%;
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
const NoticeBox = styled.div`
  background-color: white;
  padding: 0 10px;
  border: 2px solid #f9ecec;
  box-shadow: 0px 0px 10px -2px #ffbdd2;
  height: 60px;
  border-radius: 8px;
  margin-bottom: 20px;
`

export default BoardCategoryPage
