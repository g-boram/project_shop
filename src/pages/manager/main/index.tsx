import Flex from '@/components/shared/Flex'
import Button from '@/components/shared/Button'
import styled from '@emotion/styled'
import { css } from '@emotion/react'

import { ChangeEvent, useState } from 'react'
import { useMutation, useQuery } from 'react-query'
import { newImg } from '@/models/managerMain'

import {
  deleteMainBanner,
  getMainEventBanner,
  upDateNewImg,
} from '@/hooks/data/useStore'
import { imgUploadAndUrl } from '@/hooks/data/useStorage'

import useUser from '@/hooks/auth/useUser'
import HeadTitle from '@/components/shared/HeadTitle'
import { FadeLoader } from 'react-spinners'
import ManagerPageLayout from '@/components/shared/Layout/ManagerPageLayout'
import Spacing from '@/components/shared/Spacing'
import Text from '@/components/shared/Text'
import { useMainBanner } from '@/hooks/data/useMainData'
import { Link } from 'react-router-dom'

export default function M_MainPage() {
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
