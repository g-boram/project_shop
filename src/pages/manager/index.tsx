import Button from '@/components/shared/Button'
import Flex from '@/components/shared/Flex'
import { css } from '@emotion/react'
import styled from '@emotion/styled'
import { Link } from 'react-router-dom'

interface LinkBtnProps {
  color?: number
}

function ManagerPage() {
  return (
    <ManagerPageContainer>
      <HeaderTitle>ManagerPage</HeaderTitle>
      <Flex
        css={css`
          padding: 20px;
        `}
      >
        <LinkBtnContainer>
          <LinkBtn>
            <Link to={'/manager/main'}>메인페이지 관리</Link>
          </LinkBtn>
        </LinkBtnContainer>
        <ShowImgContainer>
          {/* @ TODO */}
          이미지 넣기
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
const HeaderTitle = styled.div`
  background: grey;
  height: 100px;
  width: 100%;
`

const LinkBtnContainer = styled.div`
  background: blue;
  height: 100px;
  width: 100%;
`
const ShowImgContainer = styled.div`
  background: yellow;
  height: 100px;
  width: 100%;
`

const LinkBtn = styled.div<LinkBtnProps>`
  background: white;
  width: 50px;
  height: 50px;
  cursor: pointer;

  &: hover {
    background: pink;
  }
`
export default ManagerPage
