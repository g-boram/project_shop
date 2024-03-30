import styled from '@emotion/styled'
import { useNavigate } from 'react-router-dom'
import Button from '../shared/Button'

const IngEvent = () => {
  const navigate = useNavigate()

  return (
    <IngEventContainer>
      <Button color="pink" full size="large" onClick={() => navigate('/event')}>
        지금 진행중인 이벤트 보러가기! Go
      </Button>
    </IngEventContainer>
  )
}

const IngEventContainer = styled.div`
  margin-top: 10px;

  @media (min-width: 600px) {
    width: 100%;
  }
  @media (max-width: 600px) {
  }
`

export default IngEvent
