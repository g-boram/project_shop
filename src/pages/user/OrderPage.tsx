import { billingAddAtom } from '@/atom/billingAdd'
import { shippingAddAtom } from '@/atom/shippingAdd'
import { orderItemAtom } from '@/atom/orderItem'
import Button from '@/components/shared/Button'
import HeadTitle from '@/components/shared/HeadTitle'
import Spacing from '@/components/shared/Spacing'
import { clearAllCartItem } from '@/remote/cart'
import { store } from '@/remote/firebase'
import styled from '@emotion/styled'
import { addDoc, collection, Timestamp } from 'firebase/firestore'
import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { toast } from 'react-toastify'
import { useRecoilValue, useSetRecoilState } from 'recoil'
import { loadTossPayments } from '@tosspayments/payment-sdk'
import { userAtom } from '@/atom/user'

const OrderPage = () => {
  const [shippingAdd, setShippingAdd] = useState({
    name: '',
    line: '',
    city: '',
    postalCode: '',
  })
  const [billingAdd, setBillingAdd] = useState({
    name: '',
    line: '',
    city: '',
    postalCode: '',
  })
  const orderItem = useRecoilValue(orderItemAtom)
  const user = useRecoilValue(userAtom)

  const navigate = useNavigate()
  const setShippingAddress = useSetRecoilState(shippingAddAtom)
  const setBillingAddress = useSetRecoilState(billingAddAtom)

  const handleShippingFormValues = (
    e: React.ChangeEvent<HTMLTextAreaElement | HTMLInputElement>,
  ) => {
    setShippingAdd((prevFormValues: any) => ({
      ...prevFormValues,
      [e.target.name]: e.target.value,
    }))
  }
  const handleBillingFormValues = (
    e: React.ChangeEvent<HTMLTextAreaElement | HTMLInputElement>,
  ) => {
    setBillingAdd((prevFormValues: any) => ({
      ...prevFormValues,
      [e.target.name]: e.target.value,
    }))
  }

  const handleSubmit = () => {
    setShippingAddress(shippingAdd)
    setBillingAddress(billingAdd)

    handleStartTossPay()
  }

  const handleStartTossPay = async () => {
    const tossPayment = await loadTossPayments(
      process.env.REACT_APP_TOSS_CLIENT_KEY!,
    )

    tossPayment
      .requestPayment('카드', {
        amount:
          (orderItem.price - orderItem.totalSale) * orderItem.buyItem.length,
        orderId: Math.random().toString(36).slice(2),
        orderName: '주문',
      })
      .then(async function (data: any) {
        // 결제 승인 API 호출
        const { orderId, paymentKey, amount } = data
        const secretKey = process.env.REACT_APP_TOSS_SECRET_KEY

        const url = `https://api.tosspayments.com/v1/payments/confirm`
        const basicToken = Buffer.from(`${secretKey}:`, 'utf-8').toString(
          'base64',
        )

        const confirmResponse = fetch(url, {
          method: 'post',
          body: JSON.stringify({
            amount,
            orderId,
            paymentKey,
          }),
          headers: {
            Authorization: `Basic ${basicToken}`,
            'Content-Type': 'application/json',
          },
        }).then((response) => response.json())

        console.log('confirmResponse', confirmResponse)

        // const today = new Date()
        // const date = today.toDateString()
        // const time = today.toLocaleDateString()

        // const orderData = {
        //   userID: user?.uid,
        //   userEmail: user?.email,
        //   orderDate: date,
        //   orderTime: time,
        //   orderAmount: amount,
        //   orderStatus: '주문수락',
        //   orderItem,
        //   shippingAdd: shippingAdd,
        //   billingAdd: billingAdd,
        //   createdAt: Timestamp.now().toDate(),
        // }

        // // 파이어베이스에 저장
        // await addDoc(collection(store, 'orders'), orderData)
        // clearAllCartItem()

        // navigate(`/order/detail/${orderId}`)
      })
      .catch((error: any) => {
        if (error.code === 'USER_CANCEL') {
          toast.error('결제창이 닫아졌습니다.')
        }
      })

    const today = new Date()
    const date = today.toDateString()
    const time = today.toLocaleDateString()

    const orderData = {
      userID: user?.uid,
      userEmail: user?.email,
      orderDate: date,
      orderTime: time,
      orderAmount:
        (orderItem.price - orderItem.totalSale) * orderItem.buyItem.length,
      orderStatus: '주문수락',
      orderItem,
      shippingAdd: shippingAdd,
      billingAdd: billingAdd,
      createdAt: Timestamp.now().toDate(),
    }

    // 파이어베이스에 저장
    await addDoc(collection(store, 'orders'), orderData)
    clearAllCartItem()

    navigate(`/order/detail/${user?.uid}`)
  }

  return (
    <OrderPageWrapper>
      <HeadTitle title="주문 페이지" desc="배송 정보를 입력해주세요" />
      <FormWrapper>
        <OrderInfo>
          <InfoHead>배송주소</InfoHead>
          <Spacing size={30} />
          <Label>받는 사람 이름</Label>
          <InputBox>
            <input
              name="name"
              id="name"
              type={'text'}
              placeholder="받는 사람 이름"
              onChange={handleShippingFormValues}
              value={shippingAdd.name}
            />
          </InputBox>

          <Label>상세 주소</Label>
          <InputBox>
            <input
              name="line"
              id="line"
              type={'text'}
              placeholder="상세 주소"
              onChange={handleShippingFormValues}
              value={shippingAdd.line}
            />
          </InputBox>

          <Label>도시</Label>
          <InputBox>
            <input
              name="city"
              id="city"
              type={'text'}
              placeholder="도시"
              onChange={handleShippingFormValues}
              value={shippingAdd.city}
            />
          </InputBox>

          <Label>우편번호</Label>
          <InputBox>
            <input
              name="postalCode"
              id="postalCode"
              type={'text'}
              placeholder="우편번호"
              onChange={handleShippingFormValues}
              value={shippingAdd.postalCode}
            />
          </InputBox>
        </OrderInfo>
        <Spacing size={20} direction="horizontal" />
        <MobileSpacing />
        <BillingInfo>
          <InfoHead>청구지 주소</InfoHead>
          <Spacing size={30} />
          <Label>받는 사람 이름</Label>
          <InputBox>
            <input
              name="name"
              id="name"
              type={'text'}
              placeholder="받는 사람 이름"
              onChange={handleBillingFormValues}
              value={billingAdd.name}
            />
          </InputBox>

          <Label>상세 주소</Label>
          <InputBox>
            <input
              name="line"
              id="line"
              type={'text'}
              placeholder="상세 주소"
              onChange={handleBillingFormValues}
              value={billingAdd.line}
            />
          </InputBox>

          <Label>도시</Label>
          <InputBox>
            <input
              name="city"
              id="city"
              type={'text'}
              placeholder="도시"
              onChange={handleBillingFormValues}
              value={billingAdd.city}
            />
          </InputBox>

          <Label>우편번호</Label>
          <InputBox>
            <input
              name="postalCode"
              id="postalCode"
              type={'text'}
              placeholder="우편번호"
              onChange={handleBillingFormValues}
              value={billingAdd.postalCode}
            />
          </InputBox>
        </BillingInfo>
      </FormWrapper>

      <Spacing size={30} />
      <ButtonBox>
        <Button size="large" onClick={() => handleSubmit()}>
          결제하기
        </Button>
      </ButtonBox>
    </OrderPageWrapper>
  )
}

const ButtonBox = styled.div`
  display: flex;
  justify-content: flex-end;
`
const OrderPageWrapper = styled.div`
  @media (min-width: 600px) {
    width: 100%;
  }
  @media (max-width: 600px) {
    width: 100vw;
  }
`
const OrderInfo = styled.div`
  width: 50%;

  @media (max-width: 600px) {
    width: 90%;
  }
`

const BillingInfo = styled.div`
  width: 50%;

  @media (max-width: 600px) {
    width: 90%;
  }
`

const FormWrapper = styled.div`
  display: flex;
  width: 100%;
  background-color: #f9f9f9;
  margin-top: 20px;
  padding: 50px 10px;
  border-radius: 10px;

  @media (max-width: 600px) {
    flex-direction: column;
    width: 100vw;
    padding: 10px 0px;
    margin-bottom: 20px;
  }
`
const InfoHead = styled.div`
  font-size: 16px;
  font-weight: bold;
  margin-bottom: 50px;

  @media (max-width: 600px) {
    margin-left: 10px;
    margin-top: 10px;
    margin-bottom: 0px;
  }
`
const Label = styled.div`
  margin-bottom: 10px;
  font-size: 12px;

  @media (max-width: 600px) {
    margin-left: 10px;
  }
`
const MobileSpacing = styled.div`
  height: 60px;

  @media (min-width: 600px) {
    display: none;
  }
`
const InputBox = styled.div`
  height: 40px;
  width: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
  margin-bottom: 20px;

  & input {
    border: 1px solid #eee;
    width: 100%;
    padding: 0px 10px;
    border-radius: 5px;
    height: 40px;
  }
  @media (max-width: 600px) {
    margin-left: 10px;
  }
`

export default OrderPage
