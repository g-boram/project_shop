import styled from '@emotion/styled'
import { keyframes } from '@emotion/react'
import { colors } from '@styles/colorPalette'

const opacity = keyframes`
    0% {
        opacity: 1;
    }

    50% {
        opacity: 0.2;
    }

    100% {
        opacity: 1;
    }
`

const Skeleton = styled.div<{ width: number | string; height: number }>(
  ({ width = '100%', height }) => ({
    width,
    height,
    backgroundColor: '#e5e5e5',
    animation: `${opacity} 2s ease-in-out 0.5s infinite`,
  }),
)

export default Skeleton
