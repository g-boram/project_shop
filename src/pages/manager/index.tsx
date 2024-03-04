import Button from '@/components/shared/Button'
import Flex from '@/components/shared/Flex'
import HeadTitle from '@/components/shared/HeadTitle'
import { css } from '@emotion/react'
import styled from '@emotion/styled'
import { Link } from 'react-router-dom'
import M_MainPage from './main'

interface LinkBtnProps {
  color?: number
}

function ManagerPage() {
  return (
    <ManagerPageContainer>
      <HeadTitle title={'ManagerPage'} />
      <Flex
        css={css`
          padding: 20px;
        `}
      >
        <LinkBtnContainer>
          <Button size="large">메인페이지 관리</Button>
        </LinkBtnContainer>
        <ShowImgContainer>
          {/* @ TODO */}
          <MainPageBox>
            <M_MainPage />
          </MainPageBox>
        </ShowImgContainer>
      </Flex>
    </ManagerPageContainer>
  )
}

const ManagerPageContainer = styled.div`
  background: pink;
  height: 100%;
  width: 100%;
`

const LinkBtnContainer = styled.div`
  background: blue;
  height: 100px;
  width: 30%;
  padding: 15px;
`
const ShowImgContainer = styled.div`
  background: yellow;
  padding: 10px;
  width: 100%;
`
const MainPageBox = styled.div`
  background: pink;
  height: 100%;
`

export default ManagerPage
