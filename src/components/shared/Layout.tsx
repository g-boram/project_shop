import styled from '@emotion/styled'
import React from 'react'

export default function Layout({ children }: { children: React.ReactNode }) {
  return <LayoutContainer>{children}</LayoutContainer>
}

const LayoutContainer = styled.div`
  background: pink;
  padding: 20px;
`
