import styled from '@emotion/styled'
import { css } from '@emotion/react'

import { Link } from 'react-router-dom'

export default function SettingDataPage() {
  return (
    <>
      <MoveBanner>
        MoveBanner
        <Link to={'/manager/data/setCosmeticData'} css={linkStyle}>
          화장품 데이터 변경하기
        </Link>
      </MoveBanner>
    </>
  )
}
const MoveBanner = styled.div`
  height: 100px;
  width: 100%;
  background-color: yellow;
`

const linkStyle = css`
  height: 50px;
  width: 100%;
  background-color: white;
`
