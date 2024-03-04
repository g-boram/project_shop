import styled from '@emotion/styled'

export default function ManagerPageLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return <Layout>{children}</Layout>
}

const Layout = styled.div`
  width: 1200px;
  padding: 20px;
  margin: 0 auto;
`
