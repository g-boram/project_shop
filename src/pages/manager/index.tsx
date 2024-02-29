import Button from '@/components/shared/Button'
import styled from '@emotion/styled'
import { Link } from 'react-router-dom'

function ManagerPage() {
  return (
    <ManagerPageContainer>
      ManagerPage
      <Button>
        <Link to={'/manager/main'}>메인페이지 관리</Link>
      </Button>
    </ManagerPageContainer>
  )
}

const ManagerPageContainer = styled.div`
  background: yellow;
  height: 100%;
  width: 100%;
`

export default ManagerPage
