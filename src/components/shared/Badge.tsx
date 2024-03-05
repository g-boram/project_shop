import styled from '@emotion/styled'

import { colors } from '@styles/colorPalette'
import Text from '@shared/Text'
import { css } from '@emotion/react'

interface BadgeProps {
  label: string
  color?: string
}

function Badge({ label, color }: BadgeProps) {
  return (
    <Container
      css={css`
        background-color: ${color ? color : colors.blue};
      `}
    >
      <Text bold={true} typography="t7" color="fontGrey">
        {label}
      </Text>
    </Container>
  )
}

const Container = styled.div`
  border-radius: 12px;
  padding: 3px 10px;
  margin-right: 15px;
`

export default Badge
