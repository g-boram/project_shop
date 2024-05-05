import { OrderProps } from '@/models/order'
import { css } from '@emotion/react'
import { MdLocalShipping } from 'react-icons/md'
import { FaHouseUser } from 'react-icons/fa'

import styled from '@emotion/styled'
import React from 'react'
import Flex from '../shared/Flex'
import Spacing from '../shared/Spacing'
import Text from '../shared/Text'

const OrderBox = ({ order }: { order: OrderProps[] | undefined }) => {
  console.log(order)
  return (
    <>
      {order?.length !== 0 ? (
        <Wrapper>
          <OrderWrapper>
            {order?.map((item, index) => (
              <>
                <OrderItem>
                  <HeadTitle>
                    <Text typography="t4">상세 결제내역 </Text>
                  </HeadTitle>
                  <Flex>
                    <ImgWrapper>
                      {item.orderItem?.imageURL !== undefined ? (
                        <img src={item.orderItem.imageURL} alt="" />
                      ) : null}
                    </ImgWrapper>
                    <Flex css={flexLowBoxStyle} direction="column">
                      <Flex justify={'space-between'} css={flexLowStyle}>
                        <Text typography="t6">브랜드명</Text>
                        <Text typography="t5">{item.orderItem?.brand}</Text>
                      </Flex>
                      <Spacing size={10} />
                      <Flex justify={'space-between'} css={flexLowStyle}>
                        <Text typography="t6">카테고리</Text>
                        <Text typography="t5">{item.orderItem?.category}</Text>
                      </Flex>
                      <Spacing size={10} />
                      <Flex justify={'space-between'} css={flexLowStyle}>
                        <Text typography="t6">상품명</Text>
                        <Text typography="t5">{item.orderItem?.name}</Text>
                      </Flex>
                      <Spacing size={10} />
                      <Flex justify={'space-between'} css={flexLowStyle}>
                        <Text typography="t6">상품 설명</Text>
                        <Text typography="t5">{item.orderItem?.desc}</Text>
                      </Flex>
                      <Spacing size={10} />
                      <Flex justify={'space-between'} css={flexLowStyle}>
                        <Text typography="t6">구매 상품</Text>
                        <div>
                          {item.orderItem?.buyItem.map((v, i) => (
                            <Text typography="t5">{v}</Text>
                          ))}
                        </div>
                      </Flex>
                      <Spacing size={30} />
                      <Flex justify={'space-between'} css={flexLowStyle}>
                        <Text typography="t6">결제금액</Text>
                        <Text typography="t5" bold>
                          {item.orderAmount}
                        </Text>
                      </Flex>
                      <Spacing size={10} />
                    </Flex>
                  </Flex>
                  <DeliveryBox>
                    <BillingBox>
                      <IconBox>
                        보내는 사람
                        <Spacing size={20} direction="horizontal" />
                        <MdLocalShipping />
                      </IconBox>
                      <InfoWrapper>
                        <Flex justify={'space-between'} css={addLowStyle}>
                          <Text typography="t6">이름</Text>
                          <Text typography="t6">{item.billingAdd?.name}</Text>
                        </Flex>
                        <Spacing size={10} />
                        <Flex justify={'space-between'} css={addLowStyle}>
                          <Text typography="t6">도시</Text>
                          <Text typography="t6">{item.billingAdd?.city}</Text>
                        </Flex>
                        <Spacing size={10} />
                        <Flex justify={'space-between'} css={addLowStyle}>
                          <Text typography="t6">상세주소</Text>
                          <Text typography="t6">{item.billingAdd?.line}</Text>
                        </Flex>
                        <Spacing size={10} />
                        <Flex justify={'space-between'} css={addLowStyle}>
                          <Text typography="t6">우편번호</Text>
                          <Text typography="t6">
                            {item.billingAdd?.postalCode}
                          </Text>
                        </Flex>
                      </InfoWrapper>
                    </BillingBox>
                    <Spacing size={10} direction="horizontal" />
                    <ShippingBox>
                      <IconBox>
                        받는사람
                        <Spacing size={20} direction="horizontal" />
                        <FaHouseUser />
                      </IconBox>
                      <InfoWrapper>
                        <Flex justify={'space-between'} css={addLowStyle}>
                          <Text typography="t6">이름</Text>
                          <Text typography="t6">{item.shippingAdd?.name}</Text>
                        </Flex>
                        <Spacing size={10} />
                        <Flex justify={'space-between'} css={addLowStyle}>
                          <Text typography="t6">도시</Text>
                          <Text typography="t6">{item.shippingAdd?.city}</Text>
                        </Flex>
                        <Spacing size={10} />
                        <Flex justify={'space-between'} css={addLowStyle}>
                          <Text typography="t6">상세주소</Text>
                          <Text typography="t6">{item.shippingAdd?.line}</Text>
                        </Flex>
                        <Spacing size={10} />
                        <Flex justify={'space-between'} css={addLowStyle}>
                          <Text typography="t6">우편번호</Text>
                          <Text typography="t6">
                            {item.shippingAdd?.postalCode}
                          </Text>
                        </Flex>
                      </InfoWrapper>
                    </ShippingBox>
                  </DeliveryBox>
                </OrderItem>
              </>
            ))}
          </OrderWrapper>
        </Wrapper>
      ) : (
        <Wrapper>
          <NoData>결제 내역이 존재하지 않습니다 ㅠㅠ</NoData>
        </Wrapper>
      )}
    </>
  )
}

// @media (max-width: 600px) {

// }
const NoData = styled.div`
  height: 200px;
  width: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
`
const Wrapper = styled.div`
  min-height: 500px;
`
const HeadTitle = styled.div`
  display: flex;
  justify-content: flex-end;
  height: 40px;
  align-items: center;
  border-right: 2px solid #303030;
  padding-right: 15px;
`
const DeliveryBox = styled.div`
  display: flex;
`
const ShippingBox = styled.div`
  background-color: #f3fbff;
  width: 50%;
  min-height: 200px;
  display: flex;
  flex-direction: column;
  align-items: center;
`
const BillingBox = styled.div`
  background-color: #fff8fa;
  width: 50%;
  min-height: 200px;
  display: flex;
  flex-direction: column;
  align-items: center;
`
const InfoWrapper = styled.div`
  width: 190px;
`
const IconBox = styled.div`
  height: 50px;
  display: flex;
  align-items: center;
`

const OrderItem = styled.div`
  min-height: 500px;
  max-width: 500px;
  background-color: #fff;
  padding: 10px;
  border: 1px solid #303030;
  border-radius: 10px;
  margin-left: 20px;
`
const ImgWrapper = styled.div`
  height: 200px;
  width: 200px;
  background-color: #eee;
  border-radius: 10px;

  img {
    height: 100%;
    width: 100%;
    object-fit: contain;
  }
`
const OrderWrapper = styled.div`
  display: flex;
  overflow: scroll;
`

const flexLowBoxStyle = css`
  width: 260px;
  height: 200px;
  padding: 20px;
`
const flexLowStyle = css`
  width: 100%;
  overflow: hidden;
`
const addLowStyle = css`
  width: 100%;
  height: 25px;
  overflow: hidden;
`
export default OrderBox
