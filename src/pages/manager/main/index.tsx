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
      <Flex>
        <MoveBannerBox>
          <Banner css={bannerStyled}>Banner1</Banner>
          <Banner css={bannerStyled}>Banner2</Banner>
          <Banner css={bannerStyled}>Banner3</Banner>
        </MoveBannerBox>
        <Flex align={'center'} justify={'flex-end'}>
          <Link to={'/manager/main/setMainBanner'} css={linkStyle}>
            <Flex align={'center'}>
              <IoMdSettings size={20} />
              <Spacing size={10} direction="horizontal" />
              <Button size="large" color={'pink'}>
                배너 이미지 변경하기
              </Button>
            </Flex>
          </Link>
        </Flex>
      </Flex>
      <Flex>
        <MoveIconsBox>
          <Flex justify={'center'}>
            <Icon />
            <Icon />
            <Icon />
            <Icon />
            <Icon />
            <Icon />
          </Flex>
        </MoveIconsBox>
        <Flex align={'center'} justify={'flex-end'}>
          <Link to={'/manager/main/setCategoryIcons'} css={linkStyle}>
            <Flex align={'center'}>
              <IoMdSettings size={20} />
              <Spacing size={10} direction="horizontal" />
              <Button size="large" color={'pink'}>
                아이콘 순서 변경하기
              </Button>
            </Flex>
          </Link>
        </Flex>
      </Flex>
    </MainPageBox>
  )
}
const MainPageBox = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  padding: 50px 0px;
  letter-spacing: 1.5px;
`

const MoveBannerBox = styled.div`
  position: relative;
  display: flex;
  height: 200px;
  width: 700px;
  background-color: #bcbcbc;
  padding: 10px;
`
const Banner = styled.div`
  height: 150px;
  width: 100%;
  margin-right: 5px;
  margin-left: 5px;
  background-color: #eee;
`

const MoveIconsBox = styled.div`
  position: relative;
  height: 100px;
  width: 700px;
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
  margin-left: 20px;
  width: 200px;
`
const bannerStyled = css`
  display: flex;
  justify-content: center;
  align-items: center;
`
