import useLike from '@/hooks/like/useLike'
import addDelimiter from '@/utils/addDelimiter'
import styled from '@emotion/styled'
import Button from '../shared/Button'
import Flex from '../shared/Flex'
import Spacing from '../shared/Spacing'
import Text from '../shared/Text'

import { css } from '@emotion/react'
import { Link } from 'react-router-dom'
import { FaCartPlus } from 'react-icons/fa6'

const MyLikes = () => {
  const { data } = useLike()
  console.log('like data', data)

  return (
    <>
      {data ? (
        <LikeBox>
          {data.map((like, i) => (
            <Link to={`/cosmetic/detail/${like.cosmeticId}`}>
              <LikeRow>
                <ImgWrapper>
                  <img src={like.url} alt="" />
                </ImgWrapper>
                <Flex css={likeRowsStyle} align="center" justify={'flex-end'}>
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
                <Spacing size={50} direction={'horizontal'} />
                <Flex css={btnRowStyle}>
                  <Flex
                    direction="column"
                    justify={'center'}
                    align={'center'}
                    css={cartBtn}
                  >
                    <FaCartPlus size={25} />
                    <Spacing size={10} />
                    <div css={cartText}>장바구니에 담기</div>
                  </Flex>
                  <Spacing size={20} direction={'horizontal'} />
                  <DelButton>
                    <Button size="medium" color="error">
                      삭제
                    </Button>
                  </DelButton>
                </Flex>
              </LikeRow>
            </Link>
          ))}
        </LikeBox>
      ) : (
        <LikeBox>NoLikes</LikeBox>
      )}
    </>
  )
}

const LikeBox = styled.div`
  width: 100%;
  max-width: 1400px;
`
const LikeRow = styled.div`
  width: 100%;
  display: flex;
  padding: 10px 0;
  align-items: center;
  background-color: #f8f8f8;
  border-bottom: 1px solid #eee;
  border-top: 1px solid #eee;
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
  width: 150px;
  height: 100px;
  margin-left: 20px;
  border-radius: 10px;
  background-color: grey;
  
  & > img {
    width: 100%;
    height: 100%;
    background-color: white;
    border-radius: 10px;
    object-fit: contain;
  }
  
  @media (max-width: 600px) {
    height: 75px;
    width: 70px:
    margin-left: 20px;
    background-color: grey;

    & img {
      width: 100%;
      height: 100%;
      object-fit: contain;
      border-radius: 10px;
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
    width: 80%;
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
