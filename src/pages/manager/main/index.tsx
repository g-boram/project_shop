import styled from '@emotion/styled'
import { css } from '@emotion/react'

import { Link } from 'react-router-dom'

export default function SettingMainPage() {
  return (
    <>
      <MoveBanner>
        MoveBanner
        <Link to={'/manager/main/setMainBanner'} css={linkStyle}>
          배너이미지 변경하기
        </Link>
      </MoveBanner>
      <MoveIcons>
        MoveIcons
        <Link to={'/manager/main/setCategoryIcons'} css={linkStyle}>
          아이콘 순서 변경하기
        </Link>
      </MoveIcons>
    </>
  )
}
const MoveBanner = styled.div`
  height: 100px;
  width: 100%;
  background-color: grey;
`
const MoveIcons = styled.div`
  height: 100px;
  width: 100%;
  background-color: blue;
`
const linkStyle = css`
  height: 50px;
  width: 100%;
  background-color: white;
`
