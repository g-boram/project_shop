import styled from '@emotion/styled'
import React from 'react'
import { css } from '@emotion/react'
import Navbar from './Navbar'

export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    <LayoutContainer>
      <Navbar />
      <PagesContainer>{children}</PagesContainer>
    </LayoutContainer>
  )
}

const LayoutContainer = styled.div`
  position: relative;
  width: 100%;
  background: pink;
`
const PagesContainer = styled.div`
  position: absolute;
  width: 100%;
  top: 100px;
`
