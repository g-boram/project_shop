import MyCart from '@/components/setting/MyCart'
import MyLikes from '@/components/setting/MyLikes'
import Flex from '@/components/shared/Flex'
import HeadTitle from '@/components/shared/HeadTitle'
import Spacing from '@/components/shared/Spacing'
import Text from '@/components/shared/Text'
import useUser from '@/hooks/auth/useUser'
import styled from '@emotion/styled'

import { IoHeart, IoCart } from 'react-icons/io5'
import { useState } from 'react'
import { css } from '@emotion/react'

function MyPage() {
  const user = useUser()

  const [isCate, setIsCate] = useState(0)

  const renderComponents = () => {
    if (isCate === 0) {
      return <MyLikes />
    }
    if (isCate === 1) {
      return <MyCart />
    }
  }

  const CateItem = styled.div<{ cate: number }>`
    width: 80%;
    height: 60px;
    font-size: 22px;
    display: flex;
    justify-content: center;
    align-items: center;
    border-radius: 15px 15px 0 0;
    background-color: ${(props) =>
      props.cate === isCate ? '#303030' : 'white'};
    color: ${(props) => (props.cate === isCate ? 'white' : '#303030')};
    cursor: pointer;
    font-weight: ${(props) => (props.cate === isCate ? 'bold' : '')};

    @media (max-width: 600px) {
      font-size: 18px;
      height: 40px;
    }
  `

  return (
    <Wrapper>
      <HeadTitle title="마이 페이지" desc="My Page" />
      <UserInfoBox>
        <UserInfo>
          <Flex>
            <img
              src={
                user?.photoURL !== ''
                  ? user?.photoURL
                  : 'https://cdn1.iconfinder.com/data/icons/user-pictures/100/girl-1024.png'
              }
              alt="userImg"
              width={100}
              height={100}
              style={{
                borderRadius: '100%',
                border: '2px solid #fff',
                paddingLeft: '20px',
              }}
            />
            <Spacing size={50} direction="horizontal" />
            <Flex direction="column" justify={'center'}>
              <Text typography="t3" bold>
                {user?.displayName}{' '}
              </Text>
              <Spacing size={10} />
              <Text typography="t6">{user?.email} </Text>
            </Flex>
          </Flex>
        </UserInfo>
      </UserInfoBox>
      <UserContentBox>
        <UserContentWrapper>
          <Flex css={categoryLine}>
            <CateItem cate={0} onClick={() => setIsCate(0)}>
              찜 목록
              <Spacing size={10} direction="horizontal" />
              <IoHeart />
            </CateItem>
            <CateItem cate={1} onClick={() => setIsCate(1)}>
              장바구니
              <Spacing size={10} direction="horizontal" />
              <IoCart />
            </CateItem>
          </Flex>
          {renderComponents()}
        </UserContentWrapper>
      </UserContentBox>
    </Wrapper>
  )
}

const Wrapper = styled.div`
  min-height: 100vh;
`
const UserInfoBox = styled.div`
  width: 100%;
  height: 250px;
  max-width: 1400px;
  margin: 0 auto;
  display: flex;
  justify-content: center
  flex-direction: column;
  align-items: center;

  @media (max-width: 600px) {
    height: 200px;
    width: 100vw;
  }
`
const UserInfo = styled.div`
  width: 1200px;
  background-color: white;

  @media (max-width: 600px) {
    width: 100vw;
    width: 300px;
  }
`

const UserContentBox = styled.div`
  width: 100%;
  min-height: 600px;
`
const UserContentWrapper = styled.div`
  width: 100%;
  max-width: 1400px;
  margin: 0 auto;
  display: flex;
  flex-direction: column;
  align-items: center;
  background-color: white;

  @media (max-width: 600px) {
    min-height: 250px;
    width: 100vw;
  }
`

const categoryLine = css`
  width: 100%;
  margin-bottom: 30px;
  border-bottom: 2px solid #000;
`
export default MyPage
