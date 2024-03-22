import styled from '@emotion/styled'

function UserPageLayout({ children }: { children: React.ReactNode }) {
  return (
    <Container>
      <Wrapper>{children}</Wrapper>
    </Container>
  )
}

const Container = styled.div`
  margin: 0 auto;
`
const Wrapper = styled.div`
  @media (max-width: 600px) {
  }
  @media (min-width: 600px) {
    min-width: 1200px;
  }
`
export default UserPageLayout
