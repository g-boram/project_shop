import { orderItemAtom } from '@/atom/orderItem'
import { clearAllCartItem, removeCartItem } from '@/remote/cart'
import addDelimiter from '@/utils/addDelimiter'
import { css } from '@emotion/react'
import styled from '@emotion/styled'
import { useNavigate } from 'react-router-dom'
import { useSetRecoilState } from 'recoil'
import Button from '../shared/Button'
import Flex from '../shared/Flex'
import Spacing from '../shared/Spacing'
import Text from '../shared/Text'

const MyCart = () => {
  const navigate = useNavigate()
  const setOrderItem = useSetRecoilState(orderItemAtom)
  const data = localStorage.getItem('cartItems')
    ? JSON.parse(localStorage.getItem('cartItems')!)
    : []

  const setOrderItemAtom = (like: any) => {
    setOrderItem(like)
    navigate('/order')
  }
  return (
    <>
      {data && data.length !== 0 ? (
        <LikeBox>
          {data.map((like: any) => (
            <LikeRow>
              <ImgWrapper
                onClick={() => navigate(`/cosmetic/detail/${like.id}`)}
              >
                <img src={like.imageURL} alt="" />
              </ImgWrapper>

              <Flex css={likeRowsStyle} align="center" justify={'flex-end'}>
                <Flex direction="column">
                  <Flex justify={'flex-end'} align={'center'}>
                    <Text typography="t6">{like.category}</Text>
                    <Spacing size={10} direction={'horizontal'} />
                    <Text typography="t7" css={brandNameStyle}>
                      {like.brand}
                    </Text>
                  </Flex>
                  <Spacing size={10} />
                  <Flex justify={'flex-end'} align={'center'}>
                    <Spacing size={10} direction={'horizontal'} />
                    <Text typography="t5">{like.name}</Text>
                  </Flex>
                  <Spacing size={30} />
                  <Flex direction="column" align={'flex-end'}>
                    {like.buyItem.map((v: any) => (
                      <>
                        <Text typography="t7">{v}</Text>
                        <Spacing size={5} />
                      </>
                    ))}
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
                    <Text typography="t7">
                      {addDelimiter(
                        Number(like.price) - Number(like.totalSale),
                      )}
                    </Text>
                    <Spacing size={5} direction={'horizontal'} />
                    <Text typography="t7"> X </Text>
                    <Spacing size={5} direction={'horizontal'} />
                    <Text typography="t7">{like.buyItem.length}</Text>
                  </Flex>
                  <Spacing size={15} />
                  <Flex justify={'flex-end'} align={'center'}>
                    <Text typography="t5" bold>
                      {' '}
                      Total :
                    </Text>
                    <Spacing size={20} direction={'horizontal'} />
                    <Text typography="t5" bold>
                      {addDelimiter(
                        (Number(like.price) - Number(like.totalSale)) *
                          like.buyItem.length,
                      )}
                    </Text>
                  </Flex>

                  <Flex css={btnRowStyle}>
                    <Button
                      size="medium"
                      onClick={() => setOrderItemAtom(like)}
                      css={buyBtnStyle}
                    >
                      구매하기
                    </Button>
                    <Spacing size={5} direction={'horizontal'} />
                    <Button
                      size="medium"
                      color="error"
                      onClick={() => removeCartItem(like)}
                    >
                      삭제
                    </Button>
                  </Flex>
                </Flex>
              </Flex>
            </LikeRow>
          ))}
          <AllClearBox>
            <Button
              full
              size="large"
              color="pink"
              onClick={() => clearAllCartItem()}
            >
              전체삭제
            </Button>
          </AllClearBox>
        </LikeBox>
      ) : (
        <NoLikeBox>
          <div>장바구니에 상품이 없습니다 ㅠㅠ</div>
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
  display: flex;
  padding: 10px 0;
  align-items: center;
  background-color: #f8f8f8;
  border-bottom: 1px solid #eee;
  border-top: 1px solid #eee;
  justify-content: space-between;

  @media (min-width: 600px) {
    width: 100%;
  }
  @media (max-width: 600px) {
    width: 100vw;
  }
`

const AllClearBox = styled.div`
  height: 50px;
  margin-top: 30px;
  margin-bottom: 50px;
`
const ImgWrapper = styled.div`
  @media (min-width: 600px) {
    width: 150px;
    height: 150px;
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
    height: 150px;
    width: 150px;
    margin-left: 10px;
    background-color: white;

    & img {
      width: 100%;
      height: 100%;
      object-fit: contain;
      background-color: white;
    }
  }
`

const btnRowStyle = css`
  height: 40px;
  margin-top: 50px;
  margin-bottom: 20px;
  display: flex;
  justify-content: flex-end;
`
const likeRowsStyle = css`
  margin-right: 20px;
  margin-top: 20px;
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
const buyBtnStyle = css`
  @media (max-width: 600px) {
    display: none;
  }
`
const saleTextStyle = css`
  text-decoration-line: line-through;
`
export default MyCart
