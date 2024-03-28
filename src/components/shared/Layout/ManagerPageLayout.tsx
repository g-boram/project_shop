import styled from '@emotion/styled'
import { Link } from 'react-router-dom'
import Button from '../Button'
import Flex from '../Flex'
import Spacing from '../Spacing'
import Text from '../Text'

export default function ManagerPageLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <Container>
      {/* 왼쪽 네비바 영역 */}
      <MoveNavBox>
        <Spacing size={80} />
        <Text typography="t3" bold color="fontGrey">
          메인 페이지 관리
        </Text>
        <Spacing size={20} />
        <Link to={'/manager/main/setMainBanner'}>
          <Flex align={'center'}>
            <Button size="large" color={'pink'}>
              배너 이미지 변경하기
            </Button>
          </Flex>
        </Link>
        <Spacing size={10} />
        <Link to={'/manager/main/setCategoryIcons'}>
          <Button size="large" color={'pink'}>
            아이콘 순서 변경하기
          </Button>
        </Link>
        <Spacing size={50} />

        <Text typography="t3" bold color="fontGrey">
          데이터 관리
        </Text>
        <Spacing size={20} />
        <Link to={'/manager/data/setCosmeticData'}>
          <Button size="large" color={'lightPurple'}>
            화장품 데이터 관리
          </Button>
        </Link>
        <Spacing size={20} />
        <Link to={'/manager/data/setBoardData'}>
          <Button size="large" color={'lightPurple'}>
            게시판 데이터 관리
          </Button>
        </Link>
      </MoveNavBox>
      {/* 그려질 컴포넌트 영역 */}
      <SettingWrapper>{children}</SettingWrapper>
    </Container>
  )
}

const Container = styled.div`
  display: flex;
  height: 900px;
  width: 1400px;
`
const MoveNavBox = styled.div`
  display: flex;
  flex-direction: column;
  align-items: flex-end;
  width: 250px;
  padding: 15px;
  flex-shrink: 0;
  background-color: #ffd8da;
`
const SettingWrapper = styled.div`
  overflow: scroll;
  width: 100%;
`
