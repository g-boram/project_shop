import styled from '@emotion/styled'
import { css } from '@emotion/react'

import { Link } from 'react-router-dom'
import { IoMdSettings } from 'react-icons/io'
import Flex from '@/components/shared/Flex'
import Button from '@/components/shared/Button'
import Spacing from '@/components/shared/Spacing'

export default function SettingMainPage() {
  return (
    <MainPageBox>
      <MoveBannerBox>
        <Flex>
          <Banner css={bannerStyled}>Banner1</Banner>
          <Banner css={bannerStyled}>Banner2</Banner>
          <Banner css={bannerStyled}>Banner3</Banner>
        </Flex>
        <Flex align={'center'} justify={'flex-end'}>
          <Link to={'/manager/main/setMainBanner'} css={linkStyle}>
            <Flex align={'center'}>
              <IoMdSettings size={20} />
              <Spacing size={10} direction="horizontal" />
              <Button color={'pink'}>배너 이미지 변경하기</Button>
            </Flex>
          </Link>
        </Flex>
      </MoveBannerBox>
      <MoveIconsBox>
        <Flex>
          <Icon />
          <Icon />
          <Icon />
          <Icon />
          <Icon />
          <Icon />
        </Flex>
        <Flex align={'center'} justify={'flex-end'}>
          <Link to={'/manager/main/setCategoryIcons'} css={linkStyle}>
            <Flex align={'center'}>
              <IoMdSettings size={20} />
              <Spacing size={10} direction="horizontal" />
              <Button color={'pink'}>아이콘 순서 변경하기</Button>
            </Flex>
          </Link>
        </Flex>
      </MoveIconsBox>
    </MainPageBox>
  )
}
const MainPageBox = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  padding: 50px 100px;
  letter-spacing: 1.5px;
`

const MoveBannerBox = styled.div`
  position: relative;
  height: 190px;
  width: 500px;
  background-color: #bcbcbc;
  padding: 10px;
`
const Banner = styled.div`
  height: 180px;
  width: 100%;
  margin-right: 5px;
  margin-left: 5px;
  background-color: #eee;
`

const MoveIconsBox = styled.div`
  position: relative;
  height: 100px;
  width: 500px;
  background-color: #bcbcbc;
  padding: 10px;
`
const Icon = styled.div`
  height: 60px;
  width: 60px;
  margin-right: 11px;
  margin-left: 11px;
  border-radius: 100%;
  background-color: #eee;
`

const linkStyle = css`
  position: absolute;
  bottom: 10px;
`
const bannerStyled = css`
  display: flex;
  justify-content: center;
  align-items: center;
`
