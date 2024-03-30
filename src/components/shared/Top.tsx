import { css } from '@emotion/react'

import Flex from './Flex'
import Spacing from './Spacing'
import Text from './Text'

interface TopProps {
  title: string
  subTitle?: string
}

function Top({ title, subTitle }: TopProps) {
  return (
    <Flex direction="column" css={containerStyles}>
      <Text bold={true} typography="t4">
        {title}
      </Text>
      <Spacing size={10} />
      <Text typography="t7">{subTitle}</Text>
    </Flex>
  )
}

const containerStyles = css`
  padding: 24px;
`

export default Top
