import styled from '@emotion/styled'
import { colors, Colors } from '@styles/colorPalette'

interface TagProps {
  color?: string
  height?: string
  fontSize?: string
  backgroundColor?: string
}

const Tag = styled.span<TagProps>(
  ({
    color = colors.white,
    backgroundColor = colors.blue,
    height = 'auto',
    fontSize = '11px',
  }) => ({
    fontSize: fontSize,
    padding: '4px 0px',
    fontWeight: 'bold',
    borderRadius: '2px',
    textAlign: 'center',
    height: height,
    width: '100%',
    display: 'inline-block',
    color: color in colors ? colors[color as Colors] : color,
    backgroundColor:
      backgroundColor in colors
        ? colors[backgroundColor as Colors]
        : backgroundColor,
  }),
)

export default Tag
