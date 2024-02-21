import styled from '@emotion/styled'

import { colors } from '@styles/colorPalette'
import Text from '@shared/Text'

interface BadgeProps {
  label: string
}

function Badge({ label }: BadgeProps) {
  return (
    <Container>
      <Text bold={true} typography="t7" color="white">
        {label}
      </Text>
    </Container>
  )
}

const Container = styled.div`
  border-radius: 12px;
  background-color: ${colors.blue};
  padding: 3px 10px;
  margin-right: 15px;
`

export default Badge
