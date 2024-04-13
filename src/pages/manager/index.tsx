import Button from '@/components/shared/Button'
import Flex from '@/components/shared/Flex'
import ManagerHead from '@/components/shared/ManagerHead'
import Spacing from '@/components/shared/Spacing'
import styled from '@emotion/styled'
import SettingDataPage from './data'
import SettingMainPage from './main'
import { css } from '@emotion/react'
import { useState } from 'react'

function ManagerPage() {
  const [setting, setSetting] = useState(0)

  const changeBox = () => {
    if (setting === 0) {
      return <SettingMainPage />
    }
    if (setting === 1) {
      return <SettingDataPage />
    }
  }
  return (
    <>
      <ManagerHead
        title={'ManagerPage'}
        desc={'관리자 페이지 입니다. 추가 설정은 010-5829-0424 로 연락 주세요'}
      />
      <ManagerPageContainer>
        <Flex
          css={css`
            padding: 20px;
          `}
        >
          <LinkBtnContainer>
            <Button size="large" color="pink" onClick={() => setSetting(0)}>
              메인 페이지 관리
            </Button>
            <Spacing size={10} />
            <Button
              size="large"
              color="lightPurple"
              onClick={() => setSetting(1)}
            >
              데이터 관리
            </Button>
            <Spacing size={10} />
          </LinkBtnContainer>
          <ShowImgContainer>
            <MainPageBox>{changeBox()}</MainPageBox>
          </ShowImgContainer>
        </Flex>
      </ManagerPageContainer>
    </>
  )
}

const ManagerPageContainer = styled.div`
  background: #eee;
  width: 1400px;
  height: 900px;
`

const LinkBtnContainer = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  height: 800px;
  width: 250px;
  padding: 15px;
  flex-shrink: 0;
`
const ShowImgContainer = styled.div`
  padding: 10px;
  width: 100%;
  box-shadow: 0px 0px 10px -2px #ffbdd2;
`
const MainPageBox = styled.div`
  background: white;
  height: 100%;
`

export default ManagerPage
