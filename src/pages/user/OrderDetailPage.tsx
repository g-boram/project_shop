import OrderBox from '@/components/order/OrderBox'
import HeadTitle from '@/components/shared/HeadTitle'
import { OrderProps } from '@/models/order'
import { store } from '@/remote/firebase'
import styled from '@emotion/styled'
import { collection, getDocs, orderBy, query, where } from 'firebase/firestore'
import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'

const OrderDetailPage = () => {
  const params = useParams()
  const [order, setOrder] = useState<OrderProps[] | undefined>()
  const [todayOrder, setTodayOrder] = useState<OrderProps[] | undefined>()
  const [prevOrder, setPrevOrder] = useState<OrderProps[] | undefined>()

  const today = new Date()
  const time = today.toLocaleDateString()

  // 주문 데이터 가져오기
  const getDetailOrders = async (id: string) => {
    const docRef = collection(store, 'orders')
    const q = query(
      docRef,
      where('userID', '==', id),
      orderBy('createdAt', 'desc'),
    )
    const querySnapshot = await getDocs(q)
    let documentsArray: any = []

    querySnapshot.forEach((doc) => {
      const data = {
        id: doc.id,
        ...doc.data(),
      }
      documentsArray.push(data)
    })
    setOrder(documentsArray)
  }

  useEffect(() => {
    if (params?.id) getDetailOrders(params?.id)
  }, [params?.id])

  useEffect(() => {
    if (order) {
      const todayOrder = () => order.filter((v) => v.orderTime === time)
      const prevOrder = () => order.filter((v) => v.orderTime !== time)
      setTodayOrder(todayOrder)
      setPrevOrder(prevOrder)
    }
  }, [order])

  return (
    <div>
      <HeadTitle title="주문 확인 페이지" desc="주문하신 정보를 확인해주세요" />
      <OrderContainer>
        <TodayOrderBox>
          <Title>Today 주문 내역</Title>
          <OrderBox order={todayOrder} />
        </TodayOrderBox>
        <PrevOrderBox>
          <Title>지난 주문 내역</Title>
          <OrderBox order={prevOrder} />
        </PrevOrderBox>
      </OrderContainer>
    </div>
  )
}

const OrderContainer = styled.div`
  min-height: 800px;
`
const Title = styled.div`
  display: flex;
  height: 50px;
  align-items: center;
  background-color: #303030;
  color: #fff;
  font-weight: bold;
  padding-left: 20px;
  margin-bottom: 30px;
`
const TodayOrderBox = styled.div`
  padding: 0 0 30px 0;
`
const PrevOrderBox = styled.div`
  padding: 0 0 30px 0;
`

export default OrderDetailPage
