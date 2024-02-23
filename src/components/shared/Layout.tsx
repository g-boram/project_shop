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
  width: auto;
  margin: 0 auto;
  background: pink;
  height: 100vh;
`
const PagesContainer = styled.div`
  padding: 10px 24px;
  height: auto;
`
