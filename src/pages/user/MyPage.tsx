import MyLikes from '@/components/setting/MyLikes'
import Settings from '@/components/setting/Settings'
import Flex from '@/components/shared/Flex'
import HeadTitle from '@/components/shared/HeadTitle'
import Spacing from '@/components/shared/Spacing'
import Text from '@/components/shared/Text'
import useUser from '@/hooks/auth/useUser'
import { css } from '@emotion/react'
import styled from '@emotion/styled'
import { useState } from 'react'

function MyPage() {
  const user = useUser()

  const [isCate, setIsCate] = useState(0)

  const renderComponents = () => {
    if (isCate === 0) {
      return <Settings />
    }
    if (isCate === 1) {
      return <MyLikes />
    }
  }
  return (
    <>
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
              style={{ borderRadius: '100%', border: '2px solid #fff' }}
            />
            <Spacing size={30} direction="horizontal" />
            <Flex direction="column" justify={'center'}>
              <Text typography="t3" bold>
                {user?.displayName}{' '}
              </Text>
              <Text typography="t6">{user?.email} </Text>
            </Flex>
          </Flex>
        </UserInfo>
      </UserInfoBox>
      <UserContentBox>
        <UserContentWrapper>
          <Flex css={categoryLine}>
            <CateItem onClick={() => setIsCate(0)}>세팅</CateItem>
            <CateItem onClick={() => setIsCate(1)}>찜 목록</CateItem>
          </Flex>
          {renderComponents()}
        </UserContentWrapper>
      </UserContentBox>
    </>
  )
}

const UserInfoBox = styled.div`
  width: 100%;
  height: 250px;
  max-width: 1400px;
  margin: 0 auto;
  display: flex;
  flex-direction: column;
  align-items: center;
  background-color: grey;

  @media (max-width: 600px) {
    height: 250px;
    width: 100vw;
  }
`
const UserInfo = styled.div`
  width: 1200px;
  background-color: white;
  padding: 20px;

  @media (max-width: 600px) {
    width: auto;
    min-width: 300px;
  }
`

const UserContentBox = styled.div`
  width: 100%;
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
    height: 250px;
  }
`
const CateItem = styled.div`
  width: 100%;
  height: 60px;
  background-color: white;
  cursor: pointer;
`
const categoryLine = css`
  width: 100%;
  height: 60px;
  border-bottom: 2px solid #000;
`
export default MyPage
