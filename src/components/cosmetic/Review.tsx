import useUser from '@/hooks/auth/useUser'
import useReview from '@/hooks/data/useReview'
import { css } from '@emotion/react'
import styled from '@emotion/styled'
import { format } from 'date-fns'
import { ChangeEvent, useCallback, useEffect, useState } from 'react'
import Button from '../shared/Button'
import Flex from '../shared/Flex'
import ListRow from '../shared/ListRow'
import Spacing from '../shared/Spacing'
import Text from '../shared/Text'
import TextField from '../shared/TextField'

export function Review({ cosmeticId }: { cosmeticId: string }) {
  const { data: reviews, isLoading, write, remove } = useReview({ cosmeticId })
  const user = useUser()
  const [text, setText] = useState<string>('')

  const reviewRows = useCallback(() => {
    if (reviews?.length === 0) {
      return (
        <>
          <Spacing size={10} />
          <NoReviewBox>
            <Text typography="t6">
              아직 작성된 리뷰가 없습니다. 첫 리뷰를 작성해보세요 !
            </Text>
          </NoReviewBox>
          <Spacing size={10} />
        </>
      )
    } else {
      return (
        <ReviewList>
          <ul>
            {reviews?.map((review) => (
              <ListRow
                key={review.id}
                left={
                  review.user.photoURL ? (
                    <img src={review.user.photoURL} alt="" width={40} />
                  ) : (
                    <img
                      src={
                        'https://cdn1.iconfinder.com/data/icons/user-pictures/100/girl-1024.png'
                      }
                      alt=""
                      width={40}
                    />
                  )
                }
                contents={
                  <ListRow.Texts
                    title={review.text}
                    subTitle={format(review.createdAt, 'yyyy-MM-dd')}
                  />
                }
                right={
                  review.userId === user?.uid ? (
                    <Button
                      color="pink"
                      onClick={() => {
                        remove({
                          reviewId: review.id,
                          cosmeticId: review.cosmeticId,
                        })
                      }}
                    >
                      삭제
                    </Button>
                  ) : null
                }
              />
            ))}
          </ul>
        </ReviewList>
      )
    }
  }, [reviews, user])

  const handleTextChange = useCallback((e: ChangeEvent<HTMLInputElement>) => {
    setText(e.target.value)
  }, [])
  if (isLoading === true) {
    return null
  }

  return (
    <ReviewContainer>
      <ReviewBox>
        <Flex css={headStyle}>
          <Text typography="t4" bold>
            리뷰
          </Text>
          <Spacing size={10} direction="horizontal" />
          <Text typography="t7">구매고객이 직접 인증하는 100% 리얼 Review</Text>
        </Flex>
        {reviewRows()}
        {user != null ? (
          <TextBox>
            <TextField value={text} onChange={handleTextChange} />
            <Spacing size={5} />
            <Flex justify={'flex-end'}>
              <Button
                color="pink"
                size="medium"
                full
                disabled={text === ''}
                onClick={async () => {
                  const success = await write(text)

                  if (success === true) {
                    setText('')
                  }
                }}
              >
                작성
              </Button>
            </Flex>
          </TextBox>
        ) : null}
      </ReviewBox>
    </ReviewContainer>
  )
}

const ReviewContainer = styled.div`
  width: 100%;
  display: flex;
  justify-content: center;
`
const NoReviewBox = styled.div`
  width: 100%;
  height: 80px;
  display: flex;
  align-items: center;
  justify-content: center;
  background-color: #eee;
`
const ReviewList = styled.div`
  min-height: 300px;
  max-height: 800px;
  margin-bottom: 10px;
  overflow: scroll;
`
const TextBox = styled.div`
  margin-bottom: 100px;
`
const ReviewBox = styled.div`
  width: 90%;
`

const headStyle = css`
  height: 70px;
  align-items: flex-end;
  border-bottom: 1px solid #eee;
  padding-bottom: 5px;
  margin-bottom: 10px;
`
