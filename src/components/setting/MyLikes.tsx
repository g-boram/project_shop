import useLike from '@/hooks/like/useLike'
import addDelimiter from '@/utils/addDelimiter'
import styled from '@emotion/styled'
import Button from '../shared/Button'
import Flex from '../shared/Flex'
import Spacing from '../shared/Spacing'
import Text from '../shared/Text'

import { css } from '@emotion/react'
import { useNavigate } from 'react-router-dom'

const MyLikes = () => {
  const { data } = useLike()
  const navigate = useNavigate()

  return (
    <>
      {data && data.length !== 0 ? (
        <LikeBox>
          {data.map((like, i) => (
            <LikeRow>
              <ImgWrapper>
                <img src={like.url} alt="" />
              </ImgWrapper>

              <Flex
                css={likeRowsStyle}
                align="center"
                justify={'flex-end'}
                onClick={() => navigate(`/cosmetic/detail/${like.cosmeticId}`)}
              >
                <Flex direction="column">
                  <Flex justify={'flex-end'} align={'center'}>
                    <Text typography="t6">{like.category}</Text>
                    <Spacing size={10} direction={'horizontal'} />
                    <Text typography="t7" css={brandNameStyle}>
                      {like.brand_name}
                    </Text>
                  </Flex>
                  <Spacing size={10} />
                  <Flex justify={'flex-end'} align={'center'}>
                    <Spacing size={15} direction={'horizontal'} />
                    <Text typography="t5" bold>
                      {like.cosmeticName}
                    </Text>
                    <Spacing size={15} direction={'horizontal'} />
                    <Text typography="t7">{like.volume}</Text>
                  </Flex>
                  <Spacing size={15} />
                  <Flex justify={'flex-end'} align={'center'}>
                    <Text typography="t6" css={salePerStyle}>
                      {addDelimiter(like.salePercent) + '%'}
                    </Text>
                    <Spacing size={20} direction={'horizontal'} />
                    <Text typography="t9" css={saleTextStyle}>
                      {addDelimiter(like.price)}
                    </Text>
                    <Spacing size={5} direction={'horizontal'} />
                    <Text typography="t6" bold>
                      {addDelimiter(
                        Number(like.price) - Number(like.totalSale),
                      )}
                    </Text>
                  </Flex>
                </Flex>
              </Flex>

              <Flex css={btnRowStyle}>
                <Spacing size={20} direction={'horizontal'} />
                <DelButton>
                  <Button size="medium" color="error">
                    삭제
                  </Button>
                </DelButton>
              </Flex>
            </LikeRow>
          ))}
        </LikeBox>
      ) : (
        <NoLikeBox>
          <div>찜 한 상품이 없습니다 ㅠㅠ</div>
          <Spacing size={20} />
          <div>
            <Button
              size="large"
              color="pink"
              onClick={() => navigate('/cosmetic')}
            >
              상품 둘러보러 가기 !
            </Button>
          </div>
        </NoLikeBox>
      )}
    </>
  )
}

const NoLikeBox = styled.div`
  width: 100%;
  max-width: 1400px;
  height: 400px;
  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: column;

  @media (max-width: 600px) {
    width: 100vw;
  }
`
const LikeBox = styled.div`
  width: 100%;
  max-width: 1400px;
  @media (max-width: 600px) {
    width: 100vw;
  }
`
const LikeRow = styled.div`
  width: 100%;
  display: flex;
  padding: 10px 0;
  align-items: center;
  background-color: #f8f8f8;
  border-bottom: 1px solid #eee;
  border-top: 1px solid #eee;
  justify-content: space-between;
  @media (max-width: 600px) {
    justify-content: flex-end;
  }
`
const DelButton = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  width: 80px;

  @media (max-width: 600px) {
    width: 60px;
  }
`

const ImgWrapper = styled.div`
  @media (min-width: 600px) {
    width: 150px;
    height: 100px;
    margin-left: 20px;
    border-radius: 10px;
    background-color: white;

    & img {
      width: 100%;
      height: 100%;
      background-color: white;
      border-radius: 10px;
      object-fit: contain;
    }
  }

  @media (max-width: 600px) {
    height: 80px;
    width: 150px;
    margin-left: 10px;
    background-color: white;
    border-radius: 15%;

    & img {
      width: 100%;
      height: 100%;
      object-fit: contain;
      background-color: white;
    }
  }
`
const cartText = css`
  @media (max-width: 600px) {
    display: none;
  }
`
const cartBtn = css`
  pointer: cursor;
`
const btnRowStyle = css`
  width: 300px;

  @media (max-width: 600px) {
    width: 100px;
    margin-right: 20px;
  }
`
const likeRowsStyle = css`
  width: 100%;

  @media (max-width: 600px) {
    min-width: 100px;
  }
`
const brandNameStyle = css`
  background-color: #eee;
  border-radius: 15px;
  border: solid 1px grey;
  padding: 3px 10px;
`
const salePerStyle = css`
  color: red;
`
const saleTextStyle = css`
  text-decoration-line: line-through;
`
export default MyLikes
